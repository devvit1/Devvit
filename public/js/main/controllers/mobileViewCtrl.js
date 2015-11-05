angular.module('devvit').controller('mobileViewCtrl', function($scope, projectService, $location){
		$scope.isActive = function(route) {
			return route === $location.path();
		};
	
		$scope.mobileProjects = [];
		projectService.getWebProjects('mobile').then(function(res) {
		$scope.mobileProjects = res;

    })
	
	
})