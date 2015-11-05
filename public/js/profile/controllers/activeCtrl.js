angular.module('devvit').controller('activeCtrl', function($scope, $rootScope, activeService, activeUser){
	$scope.activeUser = activeUser;
	$scope.activeGroups = activeUser.activeGroups;
	console.log(23, $scope.activeGroups);
	console.log(16, $scope.activeUser)
	
	// $scope.getActiveGroups = function() {
	// 	activeService.getActive($rootScope.profile.id).then(function(res) {
	// 		console.log(44, res);
	// 	})
	// }
})