angular.module('devvit').controller('groupDisplayCtrl', function($scope, $rootScope, groupsService,groupInfo){
	$scope.group = groupInfo;
	$scope.groupMessages = groupInfo.messages
	// $scope.sendGroupMessage = function(message){
	// 	var data = {
	// 		message:message,
	// 		active_user_id:$rootScope.profile._id, //check for active user switch up
	// 		project_id: groupInfo._id
	// 	}
	// 	groupsService.sendGroupMessage(data).then(function(res){
	// 		$scope.groupMessages = res

	// 		console.log($scope.groupMessages)
	// 	})
	// }
	
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
	
	$(document).ready(function(){
	
		$('#groupMessageInput').keyup(function(e) {
			if (e.keyCode == 13) {
				$('#sendGroupMsg').click();
			}
		})
	});
	
})