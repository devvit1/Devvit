angular.module('devvit').controller('createCtrl', function($scope, createService, $rootScope){
	
	
	
	$scope.createProject = function(name, description, type){
		var project = {
				"active_user_id":$rootScope.profile._id,
				"name":name,
				"description": description,
				"type":type
		}
		
		createService.createProject(project)

	}
	

	
})