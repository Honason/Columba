var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var db = mongoose.connection;

// User Schema
var UserSchema = mongoose.Schema({
	password:{
		type: String, required: true, bcrypt:true
	},
	email: {
		type:String
	},
	name:{
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

module.exports.getUserByUsername = function(username, callback){
	var query = {email: username};
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