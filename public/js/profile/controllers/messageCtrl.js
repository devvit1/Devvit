angular.module('devvit').controller('messageCtrl', function($scope, $rootScope, messageService, $state){
	
	$scope.userMessages = [];
	
	(function getMessages(active_user_id){

		$scope.messagesArr = [];
		$scope.currentIndex = "";

		messageService.getMessages(active_user_id).then(function(res){
			console.log(res)
			console.log('res.mes', res.messages)
			$scope.messagesArr = res.messages;
				res.messages.forEach(function(message){

					var obj = {
								messages: message.messages,
								withUser: message.withUser.basicInfo.firstName,
								withUserLast: message.withUser.basicInfo.lastName,
								}
					$scope.userMessages.push(obj)
					console.log('userMessages', $scope.userMessages)
				})
		})
		
		// $scope.checkingIfMine = function(index) {
		// 	if($scope.messagesArr[0].messages[index].from == $rootScope.profile._id) {
		// 		return false;
		// 	} else {
		// 		return true; //true changes color to gray
		// 	}
		// }
		
		})($rootScope.profile._id)
	
		$scope.getMessageswithUser = function(user){
			$scope.messages = $scope.userMessages[user].messages;
			// console.log($scope.userMessages[user].messages)
			// console.log($scope.userMessages[user].messages[0].time)
		}
		
		$scope.selectedName = null;
		$scope.selectedNameCheck = function(index) {
			$scope.selectedName = index;
		}
		
		$scope.searchForUser = function(user) {
			messageService.getUser(user).then(function(res) {
				console.log(res);
			})
		}
		
		$scope.getCurrentIndex = function(index) {
			$scope.currentIndex = index;
			if($scope.currentIndex >= 0) {
				$scope.userClicked = true;
			}
		}
		
		// $scope.replyToUser = function(msg) {
		// 	$scope.replyObj = {
		// 		active_user_id: $rootScope.profile._id,
		// 		message: msg,
		// 		toUser: $scope.messagesArr[$scope.currentIndex].withUser._id
		// 	}
		// 	messageService.addMessage($scope.replyObj).then(function(res) {
		// 		console.log(res)
		// 	})
		// 	$scope.msg = null;
		// 	messageService.getMessages($rootScope.profile._id).then(function(res) {
		// 		$scope.messagesArr[$scope.currentIndex].messages = res.messages[$scope.currentIndex].messages;
		// 		$scope.messages = res.messages[$scope.currentIndex].messages;
		// 	})
		// }
		
		$scope.newLocation = function (index) {
			console.log(index)
			$state.go('profile.messages.current', {index: index})
			
		}
		
		$(document).ready(function(){
			$('#messageReply').keypress(function(e){
			if(e.keyCode==13)
			$('#submitReply').click();
			});
		});
	
})
