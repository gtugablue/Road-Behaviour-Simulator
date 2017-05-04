const express = require('express');
const router = express.Router();
const quiz = require('./../../database/quiz');
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
      res.redirect('/quizzes/' + results.insertId);
    })
  });

module.exports = router;