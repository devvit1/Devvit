angular.module('devvit').controller('messageCtrl', function($scope, $rootScope, messageService, $state){
	
	$scope.userMessages = [];

	(function getMessages(active_user_id){

		messageService.getMessages(active_user_id).then(function(res){
				res.messages.forEach(function(message){

	
	($scope.getMessages = function(){


		$scope.messagesArr = [];
		$scope.currentIndex = "";

		messageService.getMessages($rootScope.profile._id).then(function(res){
			console.log(res)
			res.messages.forEach(function(name) {
				$scope.userMessages.push(name.withUser)
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
	

$scope.getMessageswithUser = function(user){
	 $scope.messages = $scope.userMessages[user].messages;

}

	$scope.getCurrentIndex = function(index) {
		$scope.currentIndex = index;
		if($scope.currentIndex >= 0) {
			$scope.userClicked = true;
		}
	}
	
	$scope.newLocation = function (userId) {
		console.log(userId)
		$state.go('profile.messages.current', {id: userId})
		
	}

	
})
