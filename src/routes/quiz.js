var express = require('express');
var router = express.Router();
var config = require('./../configuration/config');

/*  /quiz/[ID]         */
router.get('/:id', function (req, res, next) {

  // TODO: Verificar se o user pode aceder a este quiz
  var questions = [
    {
      id: 1,
      statement: 'Question #1?'
    },
    {
      id: 2,
      statement: 'Question #2?'
    }
  ]
  res.render('quiz', { title: 'Express', layout: 'layout', id: req.params.id, questions: questions });
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
