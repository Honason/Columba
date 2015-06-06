var mongoose = require('mongoose');

var db = mongoose.connection;

var ProposalSchema = mongoose.Schema({
	name:{
		type: String
	}
});

var Proposal = module.exports = mongoose.model('Proposal', ProposalSchema);