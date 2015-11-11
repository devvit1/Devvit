angular.module('devvit').controller('pendingCtrl', function($scope, pendingAppService, $rootScope, activeUser){
	
	// $scope.pendingArr = [];
	
	// pendingAppService.getPending($rootScope.profile._id).then(function(res) {
	// 	console.log(10, res)
	// 	res.pendingApprovals.forEach(function(proj) {
	// 		console.log(55, proj)
	// 		pendingAppService.getProjects(proj).then(function(res) {
	// 			$scope.pendingArr.push(res);
	// 			console.log(6, $scope.pendingArr)
	// 		})
	// 	})
	// })
	$scope.activePending = activeUser.pendingApprovals;
	console.log('dicks', $scope.activePending)
	
	if ($scope.activePending.length < 1) {
		$scope.noPending = true;
		$scope.activePending = { 
			message: "You have no pending requests!"
		}
	}
})