angular.module('devvit').controller('profileCtrl', function($scope, $location){
	$scope.isActive = function(route) {
	        	return route === $location.path();
				
			}
})