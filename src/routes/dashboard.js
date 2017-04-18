var express = require('express');
var router = express.Router();
var auth = require('./../utils/auth');
var db = require('./../database/db');
var users = require('./../database/users');

/* GET dashboard page. */
router.get('/', function (req, res, next) {
  var authenticated = auth.ensureAuthenticated(req, res, next);
  if (!authenticated)
    return;
  // TODO: usar id do user
  console.log(req.user);
  var userName = '';
  users.getUserByID(req.user.id, function (error, results) {
    if(error)
      return;

    if(results.length == 0) // Inserir novo utilizador
    {
      users.createUser(req.user.id, req.user.displayName, function (error, results) {
        console.log(results);
      })
    }

    res.render('dashboard', {
      layout: 'layout',
      username: req.user.displayName
    });
  });
});

module.exports = router;
