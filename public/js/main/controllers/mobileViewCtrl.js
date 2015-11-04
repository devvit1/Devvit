angular.module('devvit').controller('mobileViewCtrl', function($scope, projectService){
	
		$scope.mobileProjects = [];
		projectService.getWebProjects('mobile').then(function(res) {
		$scope.mobileProjects = res;
		console.log($scope.mobileProjects);
    })
})