var express = require('express');
var router = express.Router();

// Members page
router.get('/', function(req, res, next) {
  	res.render('index', {});
});

module.exports = router;
