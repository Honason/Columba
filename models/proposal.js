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
	originalSupplier:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Contact'
	},
	supplier:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Contact'
	},
	supplierName:{
		type: String
	},
	originalCustomer:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Contact'
	},
	customer:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Contact'
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