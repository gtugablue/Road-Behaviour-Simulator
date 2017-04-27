var express = require('express');
var router = express.Router();
var db  = require('../database/quiz');

/* GET question page. */
router.get('/', function(req, res, next) {
  res.render('quiz', {
    layout: 'layout',
    username: 'quiz'
    //req.user.displayName
  });
});

router.get('/:id', function (req, res, next) {

  if(req.user === undefined || req.params.id === undefined)
  {
    res.redirect('/dashboard');
    return;
  }
  db.existQuiz(req.params.id, req.user.id, function (error, results) {
    if(error)
    {
      console.log(error);
      res.status(400);
      return;
    }
    if(results.length > 0)
      res.render('index', { title: 'Express', layout: 'question', id: req.params.id});
    else
      res.redirect('/dashboard');
  })
})
module.exports = router;
