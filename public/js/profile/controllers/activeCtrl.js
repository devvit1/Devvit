
angular.module('devvit').controller('activeCtrl', function($scope, $rootScope, pseudoService, activeService){
	
	console.log(22, $rootScope.profile);
	
	// $scope.activePosts = activeUser.activePosts;
	// console.log(23, $scope.activePosts);
	// console.log(16, $scope.activeUser);

	// if ($scope.activePosts.length < 1) {
	// 	$scope.noActive = true;
	// 	$scope.activePosts = { 
	// 		message: "You don't seem to have any active posts!"
	// 	}
	// }
	$scope.save = false;
  	$scope.toggleView = function() {
  		$scope.save = !$scope.save;
  }
  	
	$scope.removeProject = function(id) {
		if (confirm("Are you sure you want to delete this post?")) {
			activeService.deletePost(id).then(function(res) {	
				console.log('Message Deleted');
				pseudoService.getActive().then(function(res) {
					$scope.activePosts = res.activePosts;
						if ($scope.activePosts.length < 1) {
							$scope.noActive = true;
							$scope.activePosts = { 
							message: "You don't seem to have any active posts!"
							}
						}
				})
			})
		}
	}
	
	$scope.updatePosts = function(id, title, description) {
		activeService.updatePost(id, title, description).then(function(res) {
			console.log('Project updated');
			pseudoService.getActive().then(function(res) {
				$scope.activePosts = res.activePosts;
			})
		})
	}
	
	$scope.updateUser = function() {
		activeService.getProfile().then(function(res) {
			$rootScope.profile = res;
			$rootScope.profile.username = res.basicInfo.userName;
			console.log(100, $rootScope.profile);
		})
	} 
	
	
	
})