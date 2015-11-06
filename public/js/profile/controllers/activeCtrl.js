angular.module('devvit').controller('activeCtrl', function($scope, $rootScope, activeService, activeUser){
	$scope.activeUser = activeUser;
	$scope.activePosts = activeUser.activePosts;
	console.log(23, $scope.activePosts);
	console.log(16, $scope.activeUser);

	$scope.collpase = 
	
	$scope.save = false;
  	$scope.toggleView = function() {
  		$scope.save = !$scope.save;
  }
	
	
	$scope.removeProject = function(id) {
		if (confirm("Are you sure you want to delete this post?")) {
			activeService.deletePost(id).then(function(res) {	
				console.log('Message Deleted');
				activeService.getActive(activeUser._id).then(function(res) {
					$scope.activePosts = res.activePosts;
				})
			})
		}
	}
	
	$scope.updatePosts = function(id, title, description) {
		activeService.updatePost(id, title, description).then(function(res) {
			console.log('Project updated');
			activeService.getActive(activeUser._id).then(function(res) {
				$scope.activePosts = res.activePosts;
			})
		})
	}
	
})