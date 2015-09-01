/* global columbaApp */
// Controllers

columbaApp.controller('loginController', ['$scope', '$location', '$log', 'authService', 'dataService', 'transitionService', 
  function($scope, $location, $log, authService, dataService, transitionService){

  	$scope.transitionService = transitionService;
  	transitionService.CheckPreviousState();
  	$scope.dataService = dataService;

	$scope.login = function() {
		authService.Login($scope.email, $scope.password);
	};

	$scope.register = function() {
		authService.Register($scope.newName, $scope.newEmail, $scope.newPassword);
	};

	$scope.emailregistered = false;
	$scope.$watch('newEmail', function() {
		authService.IsEmailRegistered($scope.newEmail, function(isregistered) {
			$scope.emailregistered = isregistered;
		});
	});
}]);

columbaApp.controller('dashboardController', ['$scope', 'authService', 'userService', '$location', '$log', 'dataService', 'transitionService', 'proposalService',
 function($scope, authService, userService, $location, $log, dataService, transitionService, proposalService){
	$scope.authService = authService;
	$scope.transitionService = transitionService;
	$scope.createProposal = proposalService.createProposal;
	$scope.openProposal = proposalService.openProposal;
	$scope.proposalService = proposalService;

	var userName = authService.EnsureAuthenticated();

	if (userName) { // ensure user is logged in
		$scope.userName = userName;

		$scope.$on('$routeUpdate', function() {  // when route changes
			adjustRoutes(true);
		});

		var adjustRoutes = function(inPage) {
			if ($location.search().pId) {
				// Proposal section
				transitionService.OpenProposal();
				proposalService.openProposal($location.search().pId);

			} else {
				// Normal Dashboard section

				proposalService.getProposals(function(proposals){
					$scope.proposals = proposals;
				});

				userService.GetAllUsers(function(users){
					$scope.users = users;
				});
			}
		};

		adjustRoutes(false); // Check whether user wants something else than Dashboard

		$scope.closeEdit = function(section, save) {
			transitionService.CloseDetail(section);
			if (save) {
				proposalService.saveSection(section);
			} else {
				proposalService.cancelSection(section);
			}
		};

		$scope.deleteProposal = function() {
			proposalService.deleteProposal(function(){
				$location.url('/#');
				transitionService.DeleteProposal();
			});
		};

		transitionService.CheckPreviousState();
	}
}]);



