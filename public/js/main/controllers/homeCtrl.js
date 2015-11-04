angular.module('devvit').controller('homeCtrl', function($scope, $location){
	$scope.isActive = function(route) {
		return route === $location.path();
	};
	
	
})