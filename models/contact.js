var mongoose = require('mongoose');

var db = mongoose.connection;

var ContactSchema = mongoose.Schema({
	ownerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	type:{
		type: String
	},
	name:{
		type: String
	},
	address:{
		type: String
	},
	city:{
		type: String
	},
	zipCode:{
		type: String
	},
	country:{
		type: String
	},
	vatNumber:{
		type: String
	},
	phone:{
		type: String
	}
});

var Contact = module.exports = mongoose.model('Contact', ContactSchema);

module.exports.createContact = function(newContact, callback) {
	newContact.save(callback);
}