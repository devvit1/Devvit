angular.module('devvit').controller('messageCtrl', function($scope, $rootScope, messageService){
	(function getMessages(active_user_id){
		var messages = [];
		messageService.getMessages(active_user_id).then(function(res){
			for (var message in res){
				// var name =
				messageService.getName(res[message].fromUser).then(
					 function(name){
					// 	console.log(res)
						messages.push({
							from: name,
							message: res[message].message
							})
					 })
				
			}
			$scope.messages = messages
		})
	})($rootScope.profile._id)
})