angular.module('devvit').controller('messageCtrl', function($scope, $rootScope, messageService){
	(function getMessages(active_user_id){
		var messages = [];
		messageService.getMessages(active_user_id).then(function(res){
			for (var item in res){
				
			}
		})
	})($rootScope.profile._id)
})