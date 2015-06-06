var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.get('/', function(req, res, next) {
  res.redirect('/');
});

/* GET users listing. */
router.post('/getall', User.ensureAuthenticated, function(req, res, next) {
	User.find({}, function(err, users){
		if (err) {
			console.log(err);
		} else {
			res.json({
				success: true,
				users: users
			});
		}
	});
});

router.post('/isemailregistered', function(req, res, next){
	var email = req.body.email;

	if (email !== null && email !== "") {
		User.getUserByEmail(email, function(err, user){
			if (err) throw err;
			if (user) {
				res.json({
					success: true,
					emailRegistered: true
				});
			} else {
				res.json({
					success: true,
					emailRegistered: false
				});
			}
		});
	} else {
		res.json({
			success: false
		});
	}
});

router.post('/register', function(req, res, next) {
	// Get form values
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;

	// Form validation
	req.checkBody('name','Name field is required').notEmpty();
	req.checkBody('email','Email field is required').notEmpty();
	req.checkBody('email','Email not valid').isEmail();
	req.checkBody('password','Password field is required').notEmpty();

	// Check for errors
	var errors = req.validationErrors();

	if (errors) {
		res.json({
			success: false,
			message: 'Error.',
			errors: errors
		});
	} else {
		User.getUserByEmail(email, function(err, user){
			if (err) throw err;
			if (user) {
				console.log('User already registered');
				res.json({
					success: false,
					message: 'This email address is already registered.'
				});
			} else {
				var newUser = new User ({
					name: name,
					email: email,
					password: password
				});

				// Create user
				User.createUser(newUser, function(err, user){
					if (err) throw err;
					console.log(user);
				});

				res.json({
					success: true,
					message: 'Registered'
				});
			}
		});
	}
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},
	function(username, password, done){
		User.getUserByEmail(username, function(err, user){
			if (err) throw err;
			if (!user) {
				console.log('Unknown user');
				return done(null, false, {message: 'Unknown User'});
			}

			User.comparePassword(password, user.password, function(err, isMatch){
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					console.log('Invalid password');
					return done(null, false, {message: 'Invalid password'});
				}
			});
		});
	}
));

router.post('/login', passport.authenticate('local'), function(req, res){
	console.log('Authentivation Successful');

	// if user is found and password is right 
    // create a token
    var token = jwt.sign(req.user, 'supersecret', {
      expiresInMinutes: 1 // expires in 24 hours
    });

	res.json({
		success: true,
		message: 'You are authenticated',
		name: req.user.name,
		token: token
	});
});

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success','You have logged out');
	res.redirect('/users/login');
});

module.exports = router;
