angular.module('devvit').controller('createCtrl', function($scope, createService, $rootScope){
	
	$scope.project = {
		creator_id:$rootScope._id,
		name:'cool project',
		info: 'this is a project'
	}
	
	$scope.createProject = function(project){
		
		createService.createGroup(project)
		createService.createProject(project)
			.then(function(response){
				createService.updateUserGroups($rootScope.profile.user_id)
			})

	}
	

	
})