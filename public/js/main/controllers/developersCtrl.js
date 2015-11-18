angular.module('devvit').controller('developersCtrl', function($scope, devService, $location, $rootScope){
		
		$scope.isActive = function(route) {
			return route === $location.path();
		};
		
		$scope.members = []
	
		$scope.searchForDev = function(searchQuery) {
			$scope.members = [];
			devService.findUsers(searchQuery).then(function(res){
				res.forEach(function(user){
			console.log(user)			
					$scope.members.push(user)
					console.log(1, $scope.members);
				})

			})
		};
		

		
		

	
		
})