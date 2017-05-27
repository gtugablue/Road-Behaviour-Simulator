const express = require('express');
const router = express.Router();
const scene = require('../database/scene');
const quiz = require('../database/quiz');
const question = require('../database/question');
var auth = require('../utils/auth');

router.route('/create')
  .post((req, res) => {

    var authenticated = auth.ensureAuthenticated(req, res);
    if (!authenticated) {
      res.redirect('/');
      return;
    }

    const name = req.body.name;
    const id = parseInt(req.body.id);
    const latitude = req.body.lat;
    const longitude = req.body.lon;
    const heading = req.body.heading;
    const pitch = req.body.pitch;
    const zoom = (req.body.zoom == ''?0:req.body.zoom);
    const questions = [].concat(req.body.question);
    const decision = (req.body.decision === 'stop');
    const signs = req.body.signs;

    if(id <= 0) {
      res.status(400);
      res.redirect('/dashboard');
      return;
    }


    if (
      name == ''
      || latitude == ''
      || longitude == ''
      || heading == ''
      || pitch == ''
      || zoom < 0
      || decision == ''
      || !isJson(signs)) {

      console.log('All params must be set.')
      res.status(400);
      res.redirect('/quiz/' + id + '/scenes');
      return;
    }
    scene.createScene(id, name, latitude, longitude,heading, pitch, zoom, decision, signs, questions, function (error, results) {
      if(error)
      {
        console.log(error)
        res.status(400);
        res.redirect('/quiz/' + id + '/scenes');
        return;
      }
      if(results)
      {
        res.status(200);
        res.redirect('/quiz/' + id);
      }
    });
  });

router.route('/:sceneID/answer').post(function (req, res) {
  var authenticated = auth.ensureAuthenticated(req, res);
  if (!authenticated) {
    res.redirect('/');
    return;
  }

  var questionIDs = req.body.questionIDs;
  if (!Array.isArray(questionIDs))
    questionIDs = [];
  var answers = [];
  for (var i = 0; i < questionIDs; i++) {
    questionIDs[i] = questionIDs[i];
    answers[i] = (req.body['answers' + questionIDs[i] + ''] === 'on');
  }
  scene.answer(req.params.sceneID, req.user.id, req.body.decision, req.body.decisionTime, questionIDs, answers);

  quiz.nextScene(req.params.sceneID, function (error, results) {
    if (error) {
      console.error(error);
      res.redirect('back');
      return;
    } else if (results.length === 0) {
      res.redirect('/quiz/' + result.quiz); // No more scenes
      return;
    }
    var result = results[0];

    res.redirect('/quiz/' + result.quiz + '/scenes/' + result.idScene);
  });
});

module.exports = router;

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}