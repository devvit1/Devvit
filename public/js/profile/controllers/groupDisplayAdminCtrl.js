angular.module('devvit').controller('groupDisplayAdminCtrl', function($scope, groupInfo, groupsService, activeService, $rootScope){
	
	$scope.group = groupInfo;
	console.log($scope.group)		
	
	$scope.groupMessages = groupInfo.messages;
	$scope.pendingApp = [];
	$scope.inGroupMembers = [];
	
	$scope.save = false;
	$scope.toggleView = function() {
  		$scope.save = !$scope.save;
  	}
	
	// var inGroupMembers = function (arr){
	// 	arr.forEach(function(member){
	// 		if (!member.application.pending){
	// 			$scope.inGroupMembers.push(member)
	// 		}
	// 	})
	// } 
	// inGroupMembers($scope.group.members)
	
	
	groupInfo.members.forEach(function(member){
		if (member.application.pending){
			$scope.pendingApp.push(member)
		}
	})
	
	$scope.sendGroupMessage = function(message){
		var data = {
			message:message,
			active_user_id:$rootScope.profile._id,
			project_id: groupInfo._id
		}
		groupsService.sendGroupMessage(data).then(function(res){
			$scope.groupMessages = res.messages;
		})
		$scope.groupmessagecontent = "";
	}
	
	$scope.acceptUser = function(applied){
		var data = {
			project_id: $scope.group._id,
			user_id: applied.member._id
		}
		groupsService.acceptApplied(data).then(function(res){			
			removeFromArr(applied.member._id, $scope.pendingApp)
			$scope.group.members = res
			inGroupMembers(res)
		})
	}
	
	$scope.denyUser = function(applied){
		var data = {
			project_id: $scope.group._id,
			user_id: applied.member._id
		}

		groupsService.denyApplied(data).then(function(res){
			removeFromArr(applied.member._id, $scope.pendingApp)
			$scope.group.members = res
			inGroupMembers(res)
		})
	}
	
	$scope.updateGroup = function() {
		activeService.updatePost($scope.group).then(function(res) {
			// console.log(res);
		})

	$scope.removeUser = function(user){
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
			console.log(res)
		})

	}
	
	function removeFromArr(item, arr){
		for (var thing in arr){
			if (arr[thing].member._id === item){
				arr.splice(thing, 1)
			}
		}
		

	}
	
	$(document).ready(function(){
	
		$('#groupMessageInput').keyup(function(e) {
			if (e.keyCode == 13) {
				$('#sendGroupMsg').click();
			}
		})
	});
	
})