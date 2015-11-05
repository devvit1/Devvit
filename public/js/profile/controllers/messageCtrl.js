angular.module('devvit').controller('messageCtrl', function($scope, $rootScope, messageService){
	$scope.users = [];
	(function getMessages(active_user_id){

		messageService.getMessages(active_user_id).then(function(res){
			for (var message in res){
				var eachUser = {}
				 messageService.getName(res[message].fromUser).then(
				 	 function(name){
						eachUser = {
									_id: res[0].fromUser,
									from: name.firstName,
									messages: res[message].messages
									}
							$scope.users.push(eachUser)
				 	})
			}
			console.log($scope.users)
		})
	})($rootScope.profile._id)
	
$scope.getMessageswithUser = function(user){
	 $scope.messages = $scope.users[user];
	console.log(user)
}
	
})
