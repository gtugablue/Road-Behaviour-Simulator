var express = require('express');
var router = express.Router();
var config = require('./../configuration/config');
var BreadcrumbItem = require('./../utils/breadcrumb').BreadcrumbItem;

/* GET question page. */
router.get('/', function (req, res, next) {

  // if is quiz owner
  var page_breadcrumb = [
    new BreadcrumbItem("Home", "/"),
    new BreadcrumbItem("Dashboard", "/dashboard"),
    new BreadcrumbItem("Quiz")
  ];

  var quiz = {
    title: "Placeholder Quizz Name",
    url: "www.google.pt"
  };

  res.render('quiz-page', {
    layout: 'layout',
    title: config.app_title,
    includeCustomStyle: true,
    breadcrumb: page_breadcrumb,
    quiz: quiz
  });
});

module.exports = router;
