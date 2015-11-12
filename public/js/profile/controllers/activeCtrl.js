angular.module('devvit').controller('activeCtrl', function($scope, $rootScope, activeService){
	$scope.activePosts = $rootScope.profile.activePosts;


	if ($scope.activePosts.length < 1) {
		$scope.noActive = true;
		$scope.activePosts = { 
			message: "You don't seem to have any active posts!"
		}
	}
	
	$scope.save = false;
  	$scope.toggleView = function() {
  		$scope.save = !$scope.save;
  }
  	
	$scope.removeProject = function(id) {
		if (confirm("Are you sure you want to delete this post?")) {
			activeService.deletePost(id).then(function(res) {	
				console.log('Message Deleted');
				activeService.getActive($rootScope._id).then(function(res) {
					$scope.activePosts = res.activePosts;
				})
			})
		}
	}
	
	$scope.updatePosts = function(id, title, description) {
		activeService.updatePost(id, title, description).then(function(res) {
			console.log('Project updated');
			activeService.getActive($rootScope._id).then(function(res) {
				$scope.activePosts = res.activePosts;
			})
		})
	}
	
	
	
})