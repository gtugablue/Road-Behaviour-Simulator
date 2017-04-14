var express = require('express');
var router = express.Router();

/* GET question page. */
router.get('/', function(req, res, next) {
    res.render('layout', { title: 'Traffic Priority Simulator', layout: 'create' });
});

module.exports = router;
