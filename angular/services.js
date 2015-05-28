// Services

columbaApp.service('userService', ['$http', function($http){
	
	this.GetAllUsers = function(callback) {
		$http.post('/users/getall').success(function(users){
			callback(users);
		});
	};

}]);

columbaApp.service('authService', ['$http', '$log', '$localStorage', '$location', function($http, $log, $localStorage, $location){

	this.Login = function(email, password) {
		$http.post('/users/login', {email: email, password: password}).success(function(token){
			if (token) {
	      		$localStorage.token = token.token;
	      		$localStorage.userName = token.name;

	      		$location.path('/');
      		}
		}).error(function(err){
			$log.log(err);
		});
	};

	this.EnsureAuthenticated = function() {
		if ($localStorage.token) {
			return $localStorage.userName;
		} else {
			$location.path('/login');
			return false;
		}
	};

	this.Logout = function() {
		$localStorage.$reset();
		$location.path('/login');
	};
}]);