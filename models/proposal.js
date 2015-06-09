var mongoose = require('mongoose');

var db = mongoose.connection;

var ProposalSchema = mongoose.Schema({
	ownerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	proposalId:{
		type: String
	},
	supplier:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Supplier'
	},
	customerId:{
		type: String
	},
	issueDate:{
		type: Date, 
		default: Date.now
	},
	name:{
		type: String
	},
	body:{
		type: String
	},
	bottomNote:{
		type: String
	}
});

var Proposal = module.exports = mongoose.model('Proposal', ProposalSchema);

module.exports.createProposal = function(newProposal, callback) {
	newProposal.save(callback);
}