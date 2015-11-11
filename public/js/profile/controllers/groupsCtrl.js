angular.module('devvit').controller('groupsCtrl', function($scope, groupsService, $state, $rootScope){
	
	(function getGroups(){
		$scope.groups = []
		groupsService.getGroups($rootScope.profile._id).then(function(res){
			for (var group in res.activePosts){
				groupsService.findProject(res.activePosts[group]._id).then(
					function(res){
						$scope.groups.push(res)
					}
				)
			}
		})
	})();
	
	$scope.getGroupswithInfo = function(group){
		$scope.groupsInfo = $scope.groups[group];
	}
	
	$scope.goToGroup = function(group){
		$state.go('profile.groupdisplay', {
			group: group._id
		})
	}

})