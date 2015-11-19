angular.module('devvit').controller('groupDisplayCtrl', function($scope, $rootScope, groupsService, groupInfo){
	$scope.group = groupInfo;
	$scope.groupMessages = groupInfo.messages
	$scope.sendGroupMessage = function(message){
		var data = {
			message:message,
			active_user_id:$rootScope.profile._id, //check for active user switch up
			project_id: groupInfo._id
		}
		groupsService.sendGroupMessage(data).then(function(res){
			$scope.groupMessages = res


		})
	}
	$scope.removeSelf = function(user){
		var users = [];
		$scope.group.members.forEach(function(member){
			users.push(member._id)
		})
		var index = users.indexOf(user._id)
		$scope.group.members.splice(index, 1);
		groupsService.updateGroup($scope.group).then(function(res){
		})
		user.groups.splice(user.groups.indexOf(user._id, 1))
		groupsService.updateUser(user).then(function(res){
		})

	}
	
})