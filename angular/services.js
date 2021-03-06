// Services

columbaApp.service('dataService', ['$log', function($log){
	var self = this;
	this.lastPath = "empty";
	this.currentPath = "empty";

	this.SetLastPath = function(path) {
		self.lastPath = path.replace("/", "");
	};

}]);

columbaApp.service('userService', ['$http', function($http){
	 
	this.GetAllUsers = function(callback) {
		$http.post('/users/getall').success(function(users){
			callback(users);
		});
	};

}]);

columbaApp.service('authService', ['$http', '$log', '$localStorage', '$location', '$timeout', 'transitionService', 
  function($http, $log, $localStorage, $location, $timeout, transitionService){

	var self = this;

	this.Register = function(newName, newEmail, newPassword) { 
		$http.post('users/register', {name: newName, email: newEmail, password: newPassword}).success(function(response){
			if (response.success) {
				$timeout(function(){
					self.Login(newEmail, newPassword);
				}, 500);
			}
		}).error(function(err){
			$log.log(err);
		});
	};

	this.Login = function(email, password) {
		$http.post('/users/login', {email: email, password: password}).success(function(token){
			if (token) {
	      		$localStorage.token = token.token;
	      		$localStorage.userName = token.name;

	      		transitionService.GoToPage('/');
	      		//$location.path('/');
      		}
		}).error(function(err){
			$log.log(err);
		});
	};

	this.IsEmailRegistered = function(email, callback) {
		if (email) {
			$http.post('users/isemailregistered', {email: email}).success(function(response){
				callback(response.emailRegistered);
			});
		} else { callback(false); }
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
		transitionService.GoToPage('/login');
	};
}]);