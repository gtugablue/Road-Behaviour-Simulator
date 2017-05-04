var express = require('express');
var router = express.Router();
var config = require('./../configuration/config');
var db = require('../database/quiz');
const fs = require('fs');
var auth = require('./../utils/auth');

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

  db.isQuestionOwner(req.params.id, req.user.id, function (error, isOwner) {
    if (error) {
      console.log(error);
      res.status(400);
      return;
    }
    if(isOwner)
    {
      db.getScenesFromQuiz(req.params.id, req.user.id, function (error, questionsResults) {
        if(error)
        {
          console.log(error);
          res.status(400);
          return;
        }
        var scenes = [];
        for(let scene of questionsResults)
        {
          scenes.push({id: scene.idScene, statement: scene.name});
        }
        res.render('quiz', { title: 'Express', layout: 'layout', id: req.params.id, scenes: (scenes.length > 0 ? scenes : false)});
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

router.get('/:id/scenes', function (req, res, next) {

  var authenticated = auth.ensureAuthenticated(req, res, next);
  if (!authenticated) {
    return;
  }
  if(req.params.id == undefined)
  {
    res.redirect('/');
    return;
  }
  db.isQuestionOwner(req.params.id, req.user.id, function (error, isOwner) {
    if (error)
    {
      //TODO: Imprimir os erros
      console.log(error);
      res.redirect('/');
    }
    else if(isOwner)
    {
      const signsFolder = 'public/images/signs/small/';
      fs.readdir(signsFolder, function (err, files) {
        if (err) {
          console.error(err);
        }
        res.render('index', { title: 'Express', layout: 'scene', signs: files, id: req.params.id });
      })
    }
    else
      res.redirect('/');
  })

});

module.exports = router;
