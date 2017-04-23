var express = require('express');
var router = express.Router();
var auth = require('./../utils/auth');
var config = require('./../configuration/config');
var BreadcrumbItem = require('./../utils/breadcrumb').BreadcrumbItem;
var db = require('./../database/db');
var users = require('./../database/users');

/* GET dashboard page. */
router.get('/', function (req, res, next) {
    var authenticated = auth.ensureAuthenticated(req, res, next);
    if (!authenticated) {
        return;
    }

    var page_breadcrumb = [
        new BreadcrumbItem("Home", "/"),
        new BreadcrumbItem("Dashboard")
    ];

    var quizes = [
        new QuizItem(0, "Lorem ipsum FTW", "", 10),
        new QuizItem(1, "Watch out for that sign!", "", 55),
        new QuizItem(2, "Erasmus TOP10 destinations", "", 100),
        new QuizItem(3, "Node.js is awesome!", "", 6),
        new QuizItem(4, "All hail LIACC", "", 78),
        new QuizItem(5, "Best course: MSSI for sure!", "", 99999)
    ];

  users.getUserByID(req.user.id, function (error, results) {
    if(error)
      return;

    if(results.length == 0) // Inserir novo utilizador
    {
      users.createUser(req.user.id, req.user.displayName, function (error, results) {
        if(error)
          return;
      })
    }
    res.render('dashboard', {
        layout: 'layout',
        title: config.app_title,
        includeCustomStyle: true,
        breadcrumb: page_breadcrumb,
        username: req.user.displayName,
        user_name: req.user.displayName,
        user_firstname: req.user.displayName.split(" ")[0],
        customStyles: ["dashboard"],
        quizes: quizes
    });
  });
});

var QuizItem = function (number, title, href, replies) {
    this.number = number;
    this.title = title;
    this.replies = replies;
    this.href = href;
};

module.exports = router;
