// Routes

columbaApp.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
	$routeProvider

    .when('/', {
        templateUrl: 'angular/pages/dashboard.html',
        controller: 'dashboardController' ,
        reloadOnSearch: false
    })

	.when('/login', {
		templateUrl: 'angular/pages/login.html',
		controller: 'loginController'
	})

    .when('/register', {
        templateUrl: 'angular/pages/register.html',
        controller: 'loginController'
    });

	$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    config.headers.Authorization = $localStorage.token;
                }
                return config;
            },
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    }]);
}]);