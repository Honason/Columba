// Directives

columbaApp.directive('appHeader', function() {
	return {
		templateUrl: 'angular/directives/header.html',
		replace: true
	};
});

columbaApp.directive('proposalItem', function(){
	return {
		templateUrl: 'angular/directives/proposal-item.html',
		replace: true,
		scope: {
			user: "="
		}
	};
});