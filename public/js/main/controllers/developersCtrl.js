angular.module('devvit').controller('developersCtrl', function($scope, devService, $location, $state, $rootScope){
		
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
				})

			})
		};
		$scope.goToUser = function (user){
          $state.go('devvit.users', {
                user: user
          })
    	}
		

		
		

	
		
})