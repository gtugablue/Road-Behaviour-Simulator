var express = require('express');
const fs = require('fs');
var router = express.Router();

/* GET scene page. */
router.get('/:id', function(req, res, next) {
  const signsFolder = 'public/images/signs/small/';
  fs.readdir(signsFolder, function (err, files) {
    if (err) {
      console.error(err);
    }
    res.render('index', { title: 'Express', layout: 'scene', signs: files });
  })
});

module.exports = router;
