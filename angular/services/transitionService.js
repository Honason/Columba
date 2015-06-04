columbaApp.service('transitionService', ['$log', '$timeout', '$location', 'dataService', function($log, $timeout, $location, dataService){
	this.animPrepare = "prep";
	var self = this;

	this.GoToPage = function(url) {
		dataService.lastPath = dataService.currentPath;
		dataService.currentPath = url.replace("/", "");

		var lp = dataService.lastPath;
		var cp = dataService.currentPath;

		var animSpeed = 0.4;

		// Login / Register pages
		if (lp === "register" && cp === "login" || lp === "login" && cp === "register") {
			TweenLite.to(".login-group", animSpeed, {y: -150, opacity: 0, ease:Power3.easeIn});
		}

		// Login to Dashboard
		else if (lp === "login" && cp === "") {
			animSpeed = 0.3;
			TweenMax.to([".login-group", ".columba-login-logo"], .25, {y: '-200px', opacity: 0, ease:Power2.easeIn});
			//TweenMax.to(".login-box", animSpeed, {height: '150px', ease:Power3.easeInOut});
		}

		else if (lp === "" && cp === "login") { 
			animSpeed = 0.7;
			TweenMax.fromTo([".right-menu", ".left-menu"], 0.4, {opacity: 1, y:0}, {opacity: 0, y:-10});
	        TweenMax.fromTo(".paper-parent", 0.7, {opacity: 1, y:0}, {opacity: 0, y:200, ease:Power3.easeIn});
	        TweenMax.to(".header", 0.7, {height:window.innerHeight, ease:Power3.easeIn});
		}

		$timeout(function(){
			$location.path(url); 
		}, animSpeed*1000);
	};

	this.CheckPreviousState = function() {
		dataService.currentPath = $location.path().replace("/", "");

		var lp = dataService.lastPath;
		var cp = dataService.currentPath;

		// Login / Register pages
		if (lp === "register" && cp === "login" || lp === "login" && cp === "register") {
			TweenLite.from(".login-group", .5, {y: 150, opacity: 0, ease:Power3.easeOut});
		}

		// Login to Dashboard
		//$log.log("Previous: " + lp + ", Current: " + cp);
		else if (lp === "login" && cp === "") {
			self.animPrepare = "prepare bigHeader";

			TweenMax.to(".blueHeader", 0, {height: window.innerHeight});

			angular.element(document).ready(function () {
				TweenMax.to(".paper-parent", 0.1, {marginTop: -50});
		        TweenMax.fromTo(".paper-parent", 1, {y:300}, {y:0, ease:Power3.easeOut});
		        TweenMax.to(".paper-parent", 0.5, {opacity: 1});
		        $timeout(function(){
		        	TweenMax.fromTo(".header", 0.6, {height:window.innerHeight}, {height:150, ease:Power3.easeInOut});
					TweenMax.fromTo([".right-menu", ".left-menu"], 1, {opacity: 0, y:-10}, {opacity: 1, y:0});
				}, 30);
		        TweenMax.to(".blueHeader", 0, {height: 150});
		    });
		}

		else if (lp === "" && cp === "login") {
			self.animPrepare = "prepare";
			angular.element(document).ready(function () {
				TweenLite.fromTo([".login-group", ".columba-login-logo"], 0.4, {opacity: 0, y:-200}, {opacity: 1, y:0, ease:Power3.easeOut});
			});
		}

		$timeout(function(){
			self.animPrepare = "";
		}, 1200);
	};

}]);