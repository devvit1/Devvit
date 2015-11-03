angular.module('devvit').controller('profileCtrl', function($scope, $location, $rootScope, profileService){
	$scope.isActive = function(route) {
		return route === $location.path();
	};
	
	
	
	
		
	
})