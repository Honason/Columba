columbaApp.service('proposalService', ['$http', '$location', function($http, $location){

	this.loadedProposal = {};
	var self = this;

	this.createProposal = function() {
		$http.post('proposals/create-proposal').success(function(response){
			if (response.success) {
				$location.path('/').search({'pId': response.proposal._id});
			}
		});
	};

	this.openProposal = function(id) {
		$http.post('proposals/get-proposal', {id: id}).success(function(response){
			if (response.success) {
				self.loadedProposal = response;
			}
		});

		$location.path('/').search({'pId': id});
	};

	this.getProposals = function(callback) {
		$http.post('/proposals/get-proposals').success(function(response){
			callback(response.proposals);
		});
	};

	this.deleteProposal = function(callback) {
		$http.post('/proposals/delete-proposal', {id: self.loadedProposal.proposal._id}).success(function(response){
			console.log(response);
			callback();
		});
	};

	this.saveSection = function(section) {
		if (section === 'supplier') {
			var supplier = self.loadedProposal.supplier;

			$http.post('proposals/update-proposal-section', {
				section: 'supplier',
				id: supplier._id, 
				name: supplier.name, 
				address: supplier.address,
				city: supplier.city,
				zipCode: supplier.zipCode,
				country: supplier.country,
				vatNumber: supplier.vatNumber,
				phone: supplier.phone
			}).success(function(response){
				
			});

		}
	};

	this.cancelSection = function(section) {
		if (section === 'supplier') {
			var supplierId = self.loadedProposal.supplier._id;

			$http.post('proposals/get-contact', {id: supplierId}).success(function(response){
				self.loadedProposal.supplier = response.contact;
			});
		}
	};

}]);