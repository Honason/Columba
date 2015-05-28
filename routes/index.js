var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

// Members page
router.get('/', function(req, res, next) {
  	res.render('index', {});
});

function ensureAuthenticated(req, res, next){
	var token = req.body.token || req.query.token || req.headers.authorization;

	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, 'supersecret', function(err, decoded) {      
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;    
				next();
			}
		});

	} else { 
		// if there is no token
		// return an error
		return res.status(403).send({ 
		    success: false, 
		    message: 'No token provided.' 
		});
	}
}

module.exports = router;
