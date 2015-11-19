angular.module('devvit').controller('messageCtrl', function($scope, $rootScope, messageService, $state){
	
	$scope.userMessages = [];
	$scope.previewMessages = [];
	$scope.userUnread = function(user){
		var read = {}
		console.log(user)
		user.messages.forEach(function(message){
			if (!message.read){
				read[user._id] = true
			}
			else{
			read[user._id] = false;
		}
		})
		console.log(read)
		return read[user._id]
		
	};
	
	($scope.getMessages = function(){

		$scope.messagesArr = [];
		$scope.currentIndex = "";

		messageService.getMessages($rootScope.profile._id).then(function(res){
			console.log(res)
			
			res.messages.forEach(function(message){
				var anyNotRead = false;
				message.messages.forEach(function(message){
					if(!message.read){
						anyNotRead = true
					}
				})
				var obj = {
					withUser: message.withUser,
					preview: message.messages[message.messages.length-1],
					anyNotRead: anyNotRead
				}
				// $scope.userMessages.push(name.withUser)
				// $scope.userMessages.push(name.messages[lengthOf])
				$scope.userMessages.push(obj)
			})
			console.log($scope.userMessages)
		})
		
	})();
		
	$scope.selectedName = null;
	
	$scope.selectedNameCheck = function(index) {
		$scope.selectedName = index;
	}
	
	$scope.searchForUser = function(user) {
		messageService.getUser(user).then(function(res) {
			console.log(res);
		})
	}
	
	$scope.getCurrentIndex = function(index) {
		$scope.currentIndex = index;
		if($scope.currentIndex >= 0) {
			$scope.userClicked = true;
		}
	}
	
	$scope.newLocation = function (userId) {
		messageService.markAsRead(userId).then(function(res){
		$state.go('devvit.messages.current', {id: userId})
			
		})
		
	}
	
	
})