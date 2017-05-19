var express = require('express');
var router = express.Router();
var config = require('./../configuration/config');
var dbQuiz = require('../database/quiz');
var dbScene = require('../database/scene');

const fs = require('fs');
var auth = require('./../utils/auth');
var errors = require('./../utils/errors');
var ErrorMessage = errors.ErrorMessage;
var BreadcrumbItem = require('./../utils/breadcrumb').BreadcrumbItem;


/*  /quiz/[ID]         */
router.get('/:id', function (req, res, next) {
  var authenticated = auth.ensureAuthenticated(req, res, next);
  if (!authenticated) {
    return;
  }

  if (req.params.id === undefined) {
    res.redirect('/dashboard');
    return;
  }
  dbQuiz.quizExists(req.params.id, function (err, exists) {
    if (err) {
      console.log(err);
      res.status(400);
      return;
    }

    if(!exists)
    {
      res.status(404);
      res.render('not-found', {
        title: config.app_title,
        layout: 'layout',
        id: req.params.id,
      });
      return;
    }

    dbQuiz.isQuizOwner(req.params.id, req.user.id, function (error, isOwner) {
      if (error) {
        console.log(error);
        res.status(400);
        return;
      }
      if (isOwner) {
        dbQuiz.getScenesFromQuiz(req.params.id, req.user.id, function (error, questionsResults) {
          if (error) {
            console.log(error);
            res.status(400);
            return;
          }
          dbQuiz.getQuizState(req.params.id, function (error, stateResults) {
            if (error) {
              console.log(error);
              res.status(400);
              return;
            }
            var quizState = stateResults[0].state;

            var scenes = [];
            for (let scene of questionsResults) {
              scenes.push({ id: scene.idScene, statement: scene.questionStatement });
            }

            var page_breadcrumb = [
              new BreadcrumbItem("Home", "/"),
              new BreadcrumbItem("Dashboard", "/dashboard"),
              new BreadcrumbItem("Quiz")
            ];

            console.log(stateResults);
            res.render('quiz', {
              title: config.app_title,
              errors: errors.getErrors(),
              breadcrumb: page_breadcrumb,
              user_id: typeof req.user == 'undefined' ? null : req.user.id,
              layout: 'layout',
              id: req.params.id,
              scenes: (scenes.length > 0 ? scenes : false),
              quiz: { state: quizState }
            });
          });
        })
      }
      else
      {
        dbQuiz.getUnansweredQuestion(req.params.id, req.user.id, function(err, results)
        {
          if (error) {
            console.log(error);
            res.status(400);
          }
          else if(results.length  == 0)
          {
            res.render('quiz-answered', {
              title: 'Road Behaviour Simulator',
              layout: 'layout',
              quizID: req.params.quizID,
            });
          }
          else
          {
            results = results[0];
            res.redirect('/quiz/' + req.params.id + '/scenes/' + results.idScene);
          }
        });
      }
    });


})});

router.get('/:quizID/scenes/:sceneID', function (req, res, next) {

  var authenticated = auth.ensureAuthenticated(req, res, next);
  if (!authenticated) {
    return;
  }
  dbQuiz.isQuizOwner(req.params.quizID, req.user.id, function (error, isOwner) {
    if (error) {
      //TODO: Imprimir os erros
      console.error(error);
      res.redirect('/');
    }
    else if (isOwner) {
      // Owner
      const signsFolder = 'public/images/signs/small/';
      fs.readdir(signsFolder, function (err, files) {
        if (err) {
          console.error(err);
        }
        var scenery = {
          lat: 41.177209,
          lon: -8.596665,
          heading: 0,
          pitch: 0,
          zoom: 0,
        }
        res.render('scene', {
            title: 'Road Behaviour Simulator',
            layout: 'layout',
            signs: files,
            quizID: req.params.quizID,
            sceneID: req.params.sceneID,
            isOwner: true,
            scenery: scenery
          });
      }
      )
    } else {
      // Participant
      dbScene.getScene(req.params.sceneID, function (error, results) {
        if (error || results.length == 0) {
          // TODO imprimir erro
          res.redirect('/');
          return;
        }
        var result = results[0];
        var scenery = {
          lat: result.lat,
          lon: result.lon,
          heading: result.heading,
          pitch: result.pitch,
          zoom: result.zoom,
          signs: result.signs,
        };
        dbScene.getQuestions(req.params.sceneID, function (error, results) {
          if (error) {
            // TODO imprimir erro
            res.redirect('/');
            return;
          }
          res.render('scene', {
            title: 'Road Behaviour Simulator',
            layout: 'layout',
            quizID: req.params.quizID,
            sceneID: req.params.sceneID,
            questionStatement: result.questionStatement,
            isOwner: false,
            scenery: scenery,
            questions: results,
          });
        });
      });
    }
  })

});

module.exports = router;
