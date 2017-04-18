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
  res.render('index', { title: 'Express', layout: 'question' });
})
module.exports = router;
