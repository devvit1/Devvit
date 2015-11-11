angular.module('devvit').controller('messageCtrl', function($scope, $rootScope, messageService){
	$scope.userMessages = [];
	(function getMessages(active_user_id){

		messageService.getMessages(active_user_id).then(function(res){
			console.log(res.messages)
				res.messages.forEach(function(message){

					var obj = {
								messages: message.messages,
								withUser: message.withUser.basicInfo.firstName,
								withUserLast: message.withUser.basicInfo.lastName,
								}
					$scope.userMessages.push(obj)

				})
		
		})
	})($rootScope.profile._id)
	
$scope.getMessageswithUser = function(user){
	 $scope.messages = $scope.userMessages[user].messages;
	 console.log($scope.userMessages[user].messages)
	 console.log($scope.userMessages[user].messages[0].time)
}
	
})
