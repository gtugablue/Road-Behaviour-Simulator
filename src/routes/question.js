var express = require('express');
const fs = require('fs');
var router = express.Router();

/* GET question page. */
router.get('/', function(req, res, next) {
  const signsFolder = 'public/images/signs/small/';
  fs.readdir(signsFolder, function (err, files) {
    if (err) {
      console.error(err);
    }
    res.render('index', { title: 'Express', layout: 'question', signs: files });
  })
});

module.exports = router;
