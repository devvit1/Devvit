angular.module('devvit').controller('messageCtrl', function($scope, $rootScope, messageService){
	$scope.userMessages = [];
	(function getMessages(active_user_id){

		messageService.getMessages(active_user_id).then(function(res){
				res.messages.forEach(function(message){
					$scope.userMessages.push({
						name: message.fromUser.basicInfo.firstName,
						message: message.messages
					})
				})
				// var eachUser = {}
				//  messageService.getName(res[message].fromUser).then(
				//  	 function(name){
				// 		eachUser = {
				// 					_id: res[0].fromUser,
				// 					from: name.firstName,
				// 					messages: res[message].messages
				// 					}
				// 			$scope.users.push(eachUser)
				//  	})
		
		})
	})($rootScope.profile._id)
	
$scope.getMessageswithUser = function(user){
	 $scope.messages = $scope.userMessages[user].message;
	 console.log($scope.userMessages[user])
}
	
})
