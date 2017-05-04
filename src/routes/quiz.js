var express = require('express');
var router = express.Router();
var config = require('./../configuration/config');
var db = require('../database/quiz');
var errors = require('./../utils/errors');
var ErrorMessage = errors.ErrorMessage;
var BreadcrumbItem = require('./../utils/breadcrumb').BreadcrumbItem;

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
      db.getScenesFromQuiz(req.params.id, req.user.id, function (error, questionsResults) {
        if (error) {
          console.log(error);
          res.status(400);
          return;
        }
        var scenes = [];
        for (let scene of questionsResults) {
          scenes.push({ id: scene.idScene, name: scene.name });
        }

        var page_breadcrumb = [
          new BreadcrumbItem("Home", "/"),
          new BreadcrumbItem("Dashboard", "/dashboard"),
          new BreadcrumbItem("Quiz")
        ];

        res.render('quiz', {
          title: config.app_title,
          errors: errors.getErrors(),
          breadcrumb: page_breadcrumb,
          user_id: typeof req.user == 'undefined' ? null : req.user.id,
          layout: 'layout',
          id: req.params.id,
          scenes: (scenes.length > 0 ? scenes : false)
        });
      })
    }
    else
      res.redirect('/dashboard');
  });
});

/*  /quiz/[ID]/edit    */
router.get('/:id/edit', function (req, res, next) {

  var page_breadcrumb = [
    new BreadcrumbItem("Home", "/"),
    new BreadcrumbItem("Dashboard", "/dashboard"),
    new BreadcrumbItem("Quiz", "/quiz/" + req.params.id),
    new BreadcrumbItem("Edit Quiz")
  ];

  res.render('quiz-edit', {
    title: config.app_title,
    errors: errors.getErrors(),
    user_id: typeof req.user == 'undefined' ? null : req.user.id,
    layout: 'layout',
    breadcrumb: page_breadcrumb
  });
});

/*  /quiz/[ID]/answer  */
router.get('/:id/answer', function (req, res, next) {

  var page_breadcrumb = [
    new BreadcrumbItem("Home", "/"),
    new BreadcrumbItem("Dashboard", "/dashboard"),
    new BreadcrumbItem("Quiz", "/quiz/" + req.params.id),
    new BreadcrumbItem("Answer Quiz")
  ];

  res.render('quiz-answer', {
    title: config.app_title,
    errors: errors.getErrors(),
    user_id: typeof req.user == 'undefined' ? null : req.user.id,
    layout: 'layout',
    breadcrumb: page_breadcrumb
  });
});

module.exports = router;
