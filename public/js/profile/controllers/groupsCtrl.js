angular.module('devvit').controller('groupsCtrl', function($scope, groupsService, $state, $rootScope){
	
	(function getGroups(){
		$scope.groups = []
		groupsService.getGroups($rootScope.profile._id).then(function(res){
			for (var group in res){
				$scope.groups.push(res[group])
			}
			
		})
	})();
	
	$scope.getGroupswithInfo = function(group){
		$scope.groupsInfo = $scope.groups[group];
	}
	
	$scope.goToGroup = function(group){
		console.log(group)
		$state.go('profile.groupdisplay', {
			group: group
		})
	}
	
	

})