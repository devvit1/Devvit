angular.module('devvit').controller('groupsCtrl', function($scope, groupsService, $rootScope){
	
	(function getGroups(){
		$scope.groups = []
		groupsService.getGroups($rootScope.profile._id).then(function(res){
			for (var group in res.activeGroups){
				groupsService.findProject(res.activeGroups[group]).then(
					function(res){
						$scope.groups.push(res.data)
					}
				)
			}
		})
	})();

})