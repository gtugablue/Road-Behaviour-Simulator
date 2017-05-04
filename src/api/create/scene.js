const express = require('express');
const router = express.Router();
const scene = require('./../../database/scene');
var auth = require('./../../utils/auth');

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
    const decisionTime = parseInt(req.body.decisionTime);
    const decision = (req.body.decision === 'stop');

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
      || req.body.question == ''
      || decision == ''
      || decisionTime < 1
      || decisionTime > 5) {
      res.status(400);
      res.redirect('/quiz/' + id + '/scenes');
      return;
    }

    scene.createScene(id, name, latitude, longitude,heading, pitch, zoom, decisionTime, decision, questions, function (error, results) {
      if(error)
      {
        res.status(400);
        res.redirect('/quiz/' + id + '/scenes');
        return;
      }
      if(results)
        res.redirect('/quiz/' + id);
    });

  });
module.exports = router;