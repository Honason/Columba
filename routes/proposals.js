var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Proposal = require('../models/proposal');

router.get('/', function(req, res, next) {
  res.json({
  	message: "Ahoj"
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

	var proposal = "Moje nabídka";

	if (req.body.id) {
		Proposal.findOne({'ownerId': req.decoded._id,'proposalId': req.body.id}).exec(function(err, retProposal){
			if (err) {
				console.log(err);
				res.json({
					success: false,
					message: 'Error occured while returning proposal'
				});
			}

			if (retProposal) {
				res.json({
					success: true,
					message: 'Returning proposal',
					proposal: retProposal
				});
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

router.post('/create-proposal', User.ensureAuthenticated, function(req, res, next) {

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

		var newProposal = new Proposal ({
			ownerId: req.decoded._id,
			proposalId: nextId,
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