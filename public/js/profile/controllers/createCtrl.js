angular.module('devvit').controller('createCtrl', function($scope, createService, $rootScope){
	
	$scope.project = {
		active_user_id:"56380ba0090eed93c9b456a3",
		name: "alpha",
		description: "test",
		type: "web"
	}
	
	$scope.createProject = function(project){
		createService.createProject(project).then(
			function(res){
				console.log('ctrl', res)
			}
		)

	}
	

	
})