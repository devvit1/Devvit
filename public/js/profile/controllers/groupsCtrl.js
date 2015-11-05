angular.module('devvit').controller('groupsCtrl', function($scope, groupsService, $rootScope){
	
	(function getGroups(){
		$scope.groups = []
		groupsService.getGroups($rootScope.profile._id).then(function(res){
			console.log(100, res)
			for (var group in res.activeGroups){
				groupsService.findProject(res.activeGroups[group]).then(
					function(res){
						console.log(33, res);
						$scope.groups.push(res.data)
					}
				)
			}
		})
	})();

})