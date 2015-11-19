angular.module('devvit').controller('developersCtrl', function($scope, devService, $location, $state, $rootScope, messageService){
		
		$scope.isActive = function(route) {
			return route === $location.path();
		};
		
		$scope.members = []
	
		$scope.searchForDev = function(searchQuery, distance){
			$scope.members = [];
			devService.findUsers(searchQuery, distance).then(function(res){
				res.forEach(function(user){
					$scope.members.push(user)
				})

			})
		};
		$scope.goToUser = function (user){
          $state.go('devvit.users', {
                user: user
          })
    	}
		
		$scope.sendNewMessage = function(msg, toUser) {
            var obj = {
                message: msg,
                active_user_id: $rootScope.profile._id,
                toUser:    toUser
                }
                console.log(obj)
                messageService.newMessage(obj).then(function(res) {
                    console.log(res.data);
                })
        }
		

		
		

	
		
})