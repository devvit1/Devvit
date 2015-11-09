angular.module('devvit').controller('messageCtrl', function($scope, $rootScope, messageService){
	$scope.userMessages = [];
	(function getMessages(active_user_id){

		$scope.messagesArr = [];

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

				})
		
		})
		
		$scope.checkingIfMine = function() {
			// console.log('from user', $scope.messagesArr[0].messages[0].from);
			// console.log('current user', $rootScope.profile._id);
			if($scope.messagesArr[0].messages[0].from == $rootScope.profile._id) {
				return false;
			} else {
				// console.log('doesnt match')
				return true; //true changes color to gray
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
	
	$scope.searchForUser = function(user) {
		messageService.getUser(user).then(function(res) {
			console.log(res);
		})
	}
	
})
