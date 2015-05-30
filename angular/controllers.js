// Controllers

columbaApp.controller('loginController', ['$scope', '$location', '$log', 'authService', function($scope, $location, $log, authService){
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