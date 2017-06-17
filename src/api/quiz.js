"use strict";
const express = require('express');
const router = express.Router();
const quiz = require('../database/quiz');
const json2csv = require('json2csv');
var Archiver = require('archiver');

var auth = require('../utils/auth');

router.route('/create')
  .post((req, res) => {

    var authenticated = auth.ensureAuthenticated(req, res);
    if (!authenticated) {
      res.redirect('/');
      return;
    }

    if(req.body.name === '')
    {
      res.status(400);
      res.redirect('/dashboard');
      return;
    }

    quiz.createQuiz(req.user.id, req.body.name, function (error, results) {
      if(error){
        console.log(error);
        res.status(400);
        res.redirect('/dashboard');
        return;
      }
      res.status(200);
      res.redirect('/quiz/' + results.insertId);
    })
  });

router.route('/state/:state')
  .post((req, res) => {
    var authenticated = auth.ensureAuthenticated(req, res);
    if (!authenticated) {
      res.redirect('/');
      return;
    }

    const quizID = parseInt(req.body.quizID);

    const state = parseInt(req.params.state)
    if(state < 0 || state > 2 || quizID < 0)
    {
      res.redirect('/');
      return;
    }

    quiz.isQuizOwner(quizID, req.user.id, function (error, isOwner) {
      if(error)
      {
        if(error){
          console.log(error);
          res.status(400);
          res.redirect('/dashboard');
        }
      }
      else if(isOwner)
      {
        quiz.changeQuizState(quizID, state, function (error, results) {
          if(error){
            console.log(error);
            res.status(400);
            res.redirect('/dashboard');
          }
          else if(results.constructor.name === 'OkPacket')
          {
            res.status(200);
            res.redirect('/quiz/' + quizID);
          }
        })
      }

    })
  })
router.route('/export')
  .post((req, res) => {

    var authenticated = auth.ensureAuthenticated(req, res);
    if (!authenticated) {
      res.redirect('/');
      return;
    }

    if(req.body.quizID === '')
    {
      res.status(400);
      res.redirect('/dashboard');
      return;
    }

    quiz.isQuizOwner(req.body.quizID, req.user.id, function (error, owner) {
      if(owner)
      {
        res.writeHead(200, {
          'Content-Type': 'application/zip',
          'Content-disposition': 'attachment; filename=results.zip'
        });
        var zip = Archiver('zip');
        zip.pipe(res);

        Promise.all([
            quiz.getQuizDecision.bind(quiz, req.body.quizID),
            quiz.getQuizAnswers.bind(quiz, req.body.quizID)
          ].map(func => new Promise((resolve, reject) => {
            func((err, result) => {
              if(err) reject(err);
              else resolve(result);
            })
          }))
        ).then(results => {
          let decisions = results[0];
          let answers = results[1];

          const decisionsCSV = json2csv({ data: decisions,
            fields:
              ['idQuiz', 'quizName', 'idScene', 'questionStatement', 'idUser', 'name', 'decisionTime', 'decision', 'correctDecision'], del: ';'});

          zip.append(decisionsCSV, {name: 'decisions.csv'});

          const answersCSV = json2csv({ data: answers,
            fields:
              ['idQuiz', 'quizName', 'idScene', 'questionStatement', 'idUser', 'name', 'idQuestion', 'statement', 'answer'], del: ';'});

          zip.append(answersCSV, {name: 'answers.csv'});
          zip.finalize();
        })
      }
      else{
        if(error)
          console.log(error);
        res.status(400);
        res.redirect('/dashboard');
      }
    })
  });

module.exports = router;