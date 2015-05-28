// Controllers

columbaApp.controller('loginController', ['$scope', '$location', '$log', 'authService', function($scope, $location, $log, authService){
	$scope.login = function() {
		authService.Login($scope.email, $scope.password);
	};
}]);

columbaApp.controller('dashboardController', ['$scope', 'authService', 'userService', function($scope, authService, userService){
	$scope.authService = authService;
	var userName = authService.EnsureAuthenticated();

	if (userName) {
		$scope.userName = userName;
		
		// Do something in Dashboard
		userService.GetAllUsers(function(users){
			$scope.users = users;
		});

	}
}]);