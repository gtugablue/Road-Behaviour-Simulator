const express = require('express');
const router = express.Router();

router.route('/create')
  .post((req, res) => {
    console.log(req.body);

    const latitude = req.body.lat;
    const longitude = req.body.lon;
    const questions = Array.from(req.body.question);
    const decisionTime = parseInt(req.body.decisionTime);
    const decision = (req.body.decision === 'stop');

    let questionParams = [];

    if (latitude == ''
      || longitude == ''
      || questions.length <= 0
      || decision == ''
      || decisionTime < 1
      || decisionTime > 5)
    {
      res.status(400);
      res.redirect('/quiz/1');
      return;
    }


    console.log('oi');


  })
module.exports = router;