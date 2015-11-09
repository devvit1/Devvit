angular.module('devvit').controller('developersCtrl', function($scope, projectService, $location, $rootScope){
		
		$scope.isActive = function(route) {
			return route === $location.path();
		};
	
		$scope.searchForDev = function() {
			
		}
		
		
	
		
})