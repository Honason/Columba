// Controllers

columbaApp.controller('loginController', ['$scope', '$location', '$log', 'authService', 'dataService', 'transitionService', 
  function($scope, $location, $log, authService, dataService, transitionService){

  	$scope.transitionService = transitionService;
  	transitionService.CheckPreviousState();
  	$scope.dataService = dataService;
  	//dataService.SetLastPath($location.path());

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

columbaApp.controller('dashboardController', ['$scope', 'authService', 'userService', '$location', '$log', 'dataService', 'transitionService',
 function($scope, authService, userService, $location, $log, dataService, transitionService){
	$scope.authService = authService;
	var userName = authService.EnsureAuthenticated();

	if (userName) { // ensure user is logged in
		$scope.userName = userName;

		$scope.$on('$routeUpdate', function() {  // when route changes
			adjustRoutes();
		});

		var adjustRoutes = function() {
			if ($location.search().newProposal) {
				// New proposal section
				$log.log("New proposal.");
			} else {
				// Normal Dashboard section
				userService.GetAllUsers(function(users){
					$scope.users = users;
				});
			}
		};

		adjustRoutes(); // Check whether user wants something else than Dashboard
	}
}]);