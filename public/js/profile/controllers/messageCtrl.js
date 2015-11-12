angular.module('devvit').controller('messageCtrl', function($scope, $rootScope, messageService){
	$scope.userMessages = [];
	(function getMessages(){

		messageService.getMessages().then(function(res){
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

}
	
})
