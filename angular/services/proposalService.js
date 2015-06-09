columbaApp.service('proposalService', ['$http', '$location', function($http, $location){

	this.createProposal = function() {
		$http.post('proposals/create-proposal').success(function(response){
			if (response.success) {
				$location.path('/').search({'pId': response.proposal.proposalId});
			}
		});
	};

	this.getProposals = function(callback) {
		$http.post('/proposals/get-proposals').success(function(response){
			callback(response.proposals);
		});
	};

}]);