angular.module('devvit').controller('messageCurrentCtrl', function($scope, $rootScope, messageService, $state){ 
	
	$scope.checkingIfMine = function(index) {
		if($scope.messagesArr[0].messages[index].from == $rootScope.profile._id) {
			return false;
		} else {
			return true; //true changes color to gray
		}
	}
	
	$scope.replyToUser = function(msg) {
			$scope.replyObj = {
				active_user_id: $rootScope.profile._id,
				message: msg,
				toUser: $scope.messagesArr[$scope.currentIndex].withUser._id
			}
			messageService.addMessage($scope.replyObj).then(function(res) {
				console.log(res)
			})
			$scope.msg = null;
			messageService.getMessages($rootScope.profile._id).then(function(res) {
				$scope.messagesArr[$scope.currentIndex].messages = res.messages[$scope.currentIndex].messages;
				$scope.messages = res.messages[$scope.currentIndex].messages;
			})
		}
	
})