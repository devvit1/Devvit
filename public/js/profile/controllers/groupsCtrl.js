angular.module('devvit').controller('groupsCtrl', function($scope, groupsService){
	$scope.getGroups = function(user_id){
		groupsService.getGroups(user_id)
	}
})