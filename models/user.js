var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

var db = mongoose.connection;

// User Schema
var UserSchema = mongoose.Schema({
	name:{
		type: String
	},
	email: {
		type:String
	},
	password:{
		type: String, required: true, bcrypt:true
	},
	lastUsedSupplier:{
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch){
		if(err) return callback(err);
		callback(null, isMatch);
	});
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback){
	var query = {email: email};
	User.findOne(query, callback);
}

module.exports.createUser = function(newUser, callback) {
	bcrypt.hash(newUser.password, null, null, function(err, hash){
		if(err) throw err;
		// Set hashed pw
		newUser.password = hash;
		// Create User
		newUser.save(callback)
	});
}

module.exports.ensureAuthenticated = function(req, res, next){
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