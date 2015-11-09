angular.module('devvit').controller('messageCtrl', function($scope, $rootScope, messageService){
	$scope.userMessages = [];
	(function getMessages(active_user_id){

		$scope.messagesArr = [];

		messageService.getMessages(active_user_id).then(function(res){
			console.log(res)
			console.log(res.messages)
			$scope.messagesArr = res.messages;
				res.messages.forEach(function(message){

					var obj = {
								messages: message.messages,
								withUser: message.fromUser.basicInfo.firstName,
								withUserLast: message.fromUser.basicInfo.lastName
								}
					$scope.userMessages.push(obj)

				})
		
		})
		
		$scope.checkingIfMine = function() {
			if($scope.messagesArr[0].fromUser._id == $rootScope.profile._id) {
				console.log("user current", $rootScope.profile._id)
				console.log("from user", $scope.messagesArr[0].fromUser._id)
				console.log('doesnt match')
				return false;
			} else {
				return false; //false changes color to blue
			}
		}
		
	})($rootScope.profile._id)
	
	$scope.getMessageswithUser = function(user){
		$scope.messages = $scope.userMessages[user].messages;
		console.log($scope.userMessages[user].messages)
		console.log($scope.userMessages[user].messages[0].time)
	}

	
	$scope.selectedName = null;

	$scope.selectedNameCheck = function(index) {
		$scope.selectedName = index;
	}
	
})
