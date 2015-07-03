columbaApp.service('proposalService', ['$http', '$location', function($http, $location){

	this.createProposal = function() {
		$http.post('proposals/create-proposal').success(function(response){
			if (response.success) {
				$location.path('/').search({'pId': response.proposal.proposalId});
			}
		});
	};

	this.openProposal = function() {
		console.log('In open proposal');
		$location.path('/').search({'pId': '99'});
	};

	this.getProposals = function(callback) {
		$http.post('/proposals/get-proposals').success(function(response){
			callback(response.proposals);
		});
	};

}]);