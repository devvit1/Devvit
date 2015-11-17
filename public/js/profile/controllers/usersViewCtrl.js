angular.module('devvit').controller('usersViewCtrl', function($scope, foundUser){
	$scope.foundUser = foundUser;
	console.log($scope.foundUser)
})