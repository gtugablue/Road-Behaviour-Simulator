var express = require('express');
var router = express.Router();

/* GET question page. */
router.get('/', function(req, res, next) {
  res.render('quiz', {
    layout: 'layout',
    username: 'quiz'
    //req.user.displayName
  });
});

router.get('/:id', function (req, res, next) {

  // TODO: Verificar se o user pode aceder a este quiz
  var questions = [
    {
      id: 1,
      statement: 'Question #1?'
    },
    {
      id: 2,
      statement: 'Question #2?'
    }
  ]
  res.render('quiz', { title: 'Express', layout: 'layout', id: req.params.id, questions: questions});
})
module.exports = router;
