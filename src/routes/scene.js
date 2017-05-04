var express = require('express');
const fs = require('fs');
var router = express.Router();
var config = require('./../configuration/config');

/* GET scene page. */
router.get('/:id', function(req, res, next) {
  const signsFolder = 'public/images/signs/small/';
  fs.readdir(signsFolder, function (err, files) {
    if (err) {
      console.error(err);
    }
    res.render('scene', { title: config.app_title, layout: 'layout', signs: files });
  })
});

module.exports = router;
