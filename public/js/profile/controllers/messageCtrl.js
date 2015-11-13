angular.module('devvit').controller('messageCtrl', function($scope, $rootScope, messageService){
	$scope.userMessages = [];

	$scope.previewMessages = [];
	
	($scope.getMessages = function(){


					var obj = {
								messages: message.messages,
								withUser: message.withUser.basicInfo.firstName,
								withUserLast: message.withUser.basicInfo.lastName,
								}
					$scope.userMessages.push(obj)



		messageService.getMessages($rootScope.profile._id).then(function(res){
			console.log(res)
			res.messages.forEach(function(name) {
				var lengthOf = name.messages.length-1;
				var obj = {
					withUser: name.withUser,
					preview: name.messages[lengthOf]
				}
				// $scope.userMessages.push(name.withUser)
				// $scope.userMessages.push(name.messages[lengthOf])
				$scope.userMessages.push(obj)
			})
			console.log($scope.userMessages)
		})
		
	})();

		
		})

	}
	
	$scope.getCurrentIndex = function(index) {
		$scope.currentIndex = index;
		if($scope.currentIndex >= 0) {
			$scope.userClicked = true;
		}
	}
	
	$scope.newLocation = function (userId) {
		console.log(userId)
		$state.go('devvit.messages.current', {id: userId})
		
	}
	
})