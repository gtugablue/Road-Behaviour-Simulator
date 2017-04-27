var express = require('express');
var router = express.Router();
var config = require('./../configuration/config');
var db = require('../database/quiz');

/*  /quiz/[ID]         */
router.get('/:id', function (req, res, next) {
  if (req.user === undefined || req.params.id === undefined) {
    res.redirect('/dashboard');
    return;
  }

  db.isQuestionOwner(req.params.id, req.user.id, function (error, isOwner) {
    if (error) {
      console.log(error);
      res.status(400);
      return;
    }
    if (isOwner) {
      db.getQuestionsFromQuiz(req.params.id, req.user.id, function (error, questionsResults) {
        if (error) {
          console.log(error);
          res.status(400);
          return;
        }
        var questions = [];
        for (let question of questionsResults) {
          questions.push({ id: question.idQuestion, statement: question.statement });
        }
        res.render('quiz', { title: 'Express', layout: 'layout', id: req.params.id, questions: questions });
      })
    }
    else
      res.redirect('/dashboard');
  });
});

/*  /quiz/[ID]/edit    */
router.get('/:id/edit', function (req, res, next) {
  res.render('quiz-edit', {
    title: config.app_title,
    layout: 'layout'
  });
});

/*  /quiz/[ID]/answer  */
router.get('/:id/answer', function (req, res, next) {
  res.render('quiz-answer', {
    title: config.app_title,
    layout: 'layout'
  });
});

module.exports = router;
