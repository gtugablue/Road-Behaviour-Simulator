const express = require('express');
const router = express.Router();
const question = require('./../../database/question');

router.route('/create')
  .post((req, res) => {
    console.log(req.body);

    const id = parseInt(req.body.id);
    const latitude = req.body.lat;
    const longitude = req.body.lon;

    const questions = [].concat(req.body.question);
    const decisionTime = parseInt(req.body.decisionTime);
    const decision = (req.body.decision === 'stop');

    if(id <= 0) {
      res.status(400);
      res.redirect('/dashboard');
      return;
    }

    if (latitude == ''
      || longitude == ''
      || req.body.question == ''
      || decision == ''
      || decisionTime < 1
      || decisionTime > 5) {
      res.status(400);
      res.redirect('/quiz/' + id);
      return;
    }

    question.createQuestion(id, latitude, longitude, decisionTime, decision, questions, function (error, results) {
      if(error)
      {
        res.status(400);
        res.redirect('/quiz/' + id);
        return;
      }
      if(results)
        res.redirect('/quiz/' + id);
    });
    console.log('oi');
  });
module.exports = router;