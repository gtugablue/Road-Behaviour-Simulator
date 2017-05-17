"use strict";
const express = require('express');
const router = express.Router();
const quiz = require('./../../database/quiz');
const json2csv = require('json2csv');
var auth = require('./../../utils/auth');

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
        quiz.getQuizDecision(req.body.quizID, function (error, results) {
          if(error){
            console.log(error);
            res.status(400);
            res.redirect('/dashboard');
            return;
          }

          const csv = json2csv({ data: results,
            fields:
              ['idQuiz', 'quizName', 'idScene', 'sceneName', 'idUser', 'name', 'decisionTime', 'decision'], del: ';'});
          res.attachment('results-' + req.body.quizID + '.csv');
          res.status(200).send(csv);
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