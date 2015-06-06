var express = require('express');
var router = express.Router();

var Proposal = require('../models/proposal');

router.get('/', function(req, res, next) {
  res.json({
  	message: "Ahoj"
  });
});

module.exports = router;