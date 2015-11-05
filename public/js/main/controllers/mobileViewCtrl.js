angular.module('devvit').controller('mobileViewCtrl', function($scope, projectService, $location){
		$scope.isActive = function(route) {
			return route === $location.path();
		};
	
		$scope.mobileProjects = [];
		projectService.getWebProjects('mobile').then(function(res) {
		$scope.mobileProjects = res;

    })
	
		// $scope.apply = function(projectID, submittedMessage) {
		// $scope.applyInfo = {
		// 	project_id: projectID,
		// 	active_user_id: $rootScope.profile._id,
		// 	message: submittedMessage
		// }
		// projectService.applyToProject($scope.applyInfo).then(function(res){
		// 	console.log("Success");
		// })
		// }
	
})