var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Proposal = require('../models/proposal');
var Contact = require('../models/contact');

router.get('/', function(req, res, next) {
  res.json({
  	message: "Nothing here"
  });
});

router.post('/get-proposals', User.ensureAuthenticated, function(req, res, next) {

	Proposal.find({'ownerId': req.decoded._id}).sort('-issueDate').exec(function(err, proposals){
		if (err) {
			console.log(err);
		} else {
			res.json({
				success: true,
				proposals: proposals
			});
		}
	});
});

router.post('/get-proposal', User.ensureAuthenticated, function(req, res, next) {

	if (req.body.id) {
		Proposal.findOne({'ownerId': req.decoded._id,'_id': req.body.id}).exec(function(err, retProposal){
			if (err) {
				console.log(err);
				res.json({
					success: false,
					message: 'Error occured while returning proposal'
				});
			}

			if (retProposal) {

				if (retProposal.supplier) {
					Contact.findOne({'_id': retProposal.supplier}).exec(function(err, retContact){
						if (err) {console.log(err)};
						if (retContact) {
							res.json({
								success: true,
								message: 'Returning proposal',
								proposal: retProposal,
								supplier: retContact
							});
						};
					});
				}

			} else {
				res.json({
					success: false,
					message: 'Error, no proposal found.'
				});
			}
		});
	} else {
		res.json({
			success: false,
			message: 'Error, no id received.'
		});
	}
});

router.post('/get-contact', User.ensureAuthenticated, function(req, res, next) {
	if (req.body.id) {
		Contact.findOne({'ownerId': req.decoded._id, '_id': req.body.id}).exec(function(err, retContact){
			if (err) {console.log(err)};
			if (retContact) {
				res.json({
					success: true,
					message: 'Returning contact',
					contact: retContact
				});
			} else {
				res.json({
					success: false,
					message: 'Contact not found'
				});
			}
		});
	}
});

router.post('/create-proposal', User.ensureAuthenticated, function(req, res, next) {

	// Getting next ID
	Proposal.findOne({'ownerId': req.decoded._id}).sort('-issueDate').exec(function(err, retProposal){
		if (err) {
			console.log(err);
			res.json({
				success: false,
				message: 'Error occured while returning last proposal'
			});
		}
		var currentId = "0";
		if (retProposal) {currentId = retProposal.proposalId}; // If there is any proposal, get it's ID
		var nextId = countNextId(currentId); // get next ID

		// Setting supplier
		var newSupplier = new Contact ({
			ownerId: req.decoded._id,
			type: 'supplier',
			name: '',
			address: '',
			city: '',
			zipCode: '',
			country: '',
			vatNumber: '',
			phone: ''
		});

		User.findOne({'_id': req.decoded._id}).exec(function(err, myUser){
			if (err) {console.log(err)};

			if (myUser) {
				if (myUser.lastUsedSupplier) {
					console.log('There is last used supplier');
				} else {
					console.log('There is no last used supplier, do nothing.');
				}
			}
		});

		// Saving new supplier
		Contact.createContact(newSupplier, function(err, contact){
			if (err) throw err;
			if (contact) {
				console.log('Supplier created');
				console.log(contact);
			}
		});

		var newProposal = new Proposal ({
			ownerId: req.decoded._id,
			proposalId: nextId,
			supplier: newSupplier._id,
			name: ''
		});

		// Create Proposal
		Proposal.createProposal(newProposal, function(err, proposal){
			if (err) throw err;
			if (proposal) {
				console.log(proposal);
				res.json({
					success: true,
					message: 'Proposal created',
					proposal: proposal
				});
			}
		});
	});
});

router.post('/delete-proposal', User.ensureAuthenticated, function(req, res, next) {
	if (req.body.id) {
		Proposal.findOne({ownerId: req.decoded._id, _id: req.body.id}).exec(function(err, retProposal){
			if (err) {console.log(err)};
			if (retProposal) {
				Contact.findByIdAndRemove(retProposal.supplier).exec(function(err, response){
					if (err) {console.log(err)};
					if (!response) {console.log('Supplier not found.')};
				});

				retProposal.remove();

				res.json({
					success: true,
					proposal: retProposal
				});
			} else {
				res.json({
					success: false,
					message: 'Proposal not found'
				}); 
			}
		});
	} else {
		res.json({
			success: false,
			message: 'Error, there is no ID received'
		});
	}
});

router.post('/update-proposal-section', User.ensureAuthenticated, function(req, res, next) {

	var section = req.body.section;
	if (section === "supplier") {
		Contact.update({ownerId: req.decoded._id, _id: req.body.id},
			{
				name: req.body.name,
				address: req.body.address,
				city: req.body.city,
				zipCode: req.body.zipCode,
				country: req.body.country,
				vatNumber: req.body.vatNumber,
				phone: req.body.phone
			},
			function(err, response){

				Proposal.update({ownerId: req.decoded._id, supplier: req.body.id}, {supplierName: req.body.name}, function(err, resp){
					console.log("Supplier name updated");

					res.json({
						success: true,
						message: 'Proposal updated',
						supplierRes: response,
						ProposalRes: resp
					});
				});
			});
	}
});

module.exports = router;




function countNextId(idString) {
  // Count numbers at the end
  var nOfNumbers = 0;
  var lastNumberID = 0;
  var foundNumber = false;

  if (!idString) {
  	return "0";
  } else {
  	for (var i = idString.length - 1; i >= 0; i--) {
		var tempChar = parseInt(idString.charAt(i));
	    if (tempChar === parseInt(tempChar)) {
	      if (foundNumber === false) {
	        lastNumberID = i;
	        foundNumber = true;
	      }
	      nOfNumbers++;
	    } else {
	      if (foundNumber) {break;}
	    }
	}

	var beforeNum = idString.substring(0, lastNumberID+1 - nOfNumbers);
	var myNum = parseInt(idString.substring(lastNumberID+1 - nOfNumbers, lastNumberID+1)) + 1;
	var afterNum = idString.substring(lastNumberID+1, idString.length);

	if (myNum.toString().length !== nOfNumbers) {
		myNum = myNum.toString();
		for (var i = nOfNumbers - 1; i > 0; i--) {
			myNum = "0" + myNum;
		}
	}

	var finalString = beforeNum + myNum + afterNum;
	return finalString;
  }
};