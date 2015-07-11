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

		$log.log("Previous: " + lp + ", Current: " + cp);

		// Login / Register pages
		if (lp === "register" && cp === "login" || lp === "login" && cp === "register") {
			TweenLite.from(".login-group", .5, {y: 150, opacity: 0, ease:Power3.easeOut});
		}

		// Login to Dashboard
		else if (lp === "login" && cp === "") {
			self.animPrepare = "prepare bigHeader";

			TweenMax.to(".blueHeader", 0, {height: window.innerHeight});

			angular.element(document).ready(function () {
				TweenMax.to(".paper-parent", 1, {marginTop: -50, ease:Power3.easeOut});
		        TweenMax.to(".paper-parent", 0.5, {opacity: 1});
		        TweenMax.to(".blueHeader", 0, {height: 150});
		        $timeout(function(){
					TweenMax.fromTo([".right-menu", ".left-menu"], 1, {opacity: 0, y:-10}, {opacity: 1, y:0});
					TweenMax.fromTo(".header", 0.6, {height:window.innerHeight}, {height:150, ease:Power3.easeInOut});
				}, 30);
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

	this.OpenProposal = function() {
		if (dataService.lastPath === "empty" && dataService.currentPath !== "") {
			self.animPrepare = "proposal-direct";
			angular.element(document).ready(function () {
				$timeout(function(){
					TweenMax.to(".proposal-wrapper", 0, {css:{'display': 'block'}});
				}, 200);
			});
		} else {
			TweenMax.to(".proposal-paper", 0, {y: window.innerHeight});
			TweenMax.to(".proposal-wrapper", 0, {css:{'display': 'block'}});
			TweenMax.fromTo(".proposal-wrapper", 0.6, {backgroundColor:"rgba(8, 57, 106, 0)"}, {backgroundColor:"rgba(8, 57, 106, 0.8)"});
			TweenMax.to(".proposal-paper", 0.6, {y: 0, ease:Power3.easeOut});
		}
	};

	this.CloseProposal = function() {
		TweenMax.to(".proposal-paper", 0.6, {y: window.innerHeight, ease:Power3.easeIn});
		TweenMax.to(".proposal-wrapper", 0, {css:{'display': 'none'}, delay: 1});
		TweenMax.fromTo(".proposal-wrapper", 0.6, {backgroundColor:"rgba(8, 57, 106, 0.8)"}, {backgroundColor:"rgba(8, 57, 106, 0)"});
	};

	this.OpenDetail = function(id) {
		var paperDown = $('#'+id + ' .paper-down');
		TweenMax.to(paperDown, 0, {css:{'display': 'block'}});

		$('#'+id + ' .text-button.trigger').css('display', 'none');
		$('#'+id + ' .text-button.hidden').css('display', 'block');
	};

}]);