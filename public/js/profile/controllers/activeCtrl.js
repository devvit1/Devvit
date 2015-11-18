angular.module('devvit').controller('activeCtrl', function($scope, $rootScope, activeService){
	$scope.activePosts = $rootScope.profile.activePosts;
	console.log('active posts', $scope.activePosts);

	$scope.addTag = true;

	$scope.toggleAddTag = function() {
		if($scope.addTag === false) {
			$scope.addTag = true;
		}
		else if($scope.addTag === true) {
			$scope.addTag = false;
		}
	}
	
	
	$scope.addToNewTag = function(index, tag) {
		$scope.newTags = $scope.activePosts[index].tags;
		$scope.newTags.push(tag);
		$scope.activePosts[index].tags = $scope.newTags;
	}


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
  
  	$scope.toggleView = function(context) {
  		context.save = !context.save;
  }
  	
	$scope.removeProject = function(id) {
		if (confirm("Are you sure you want to delete this post?")) {
			activeService.deletePost(id).then(function(res) {	
				console.log('Message Deleted');
				
				activeService.getActive().then(function(res) {
					$rootScope.profile = res;
					$scope.activePosts = $rootScope.profile.activePosts;
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
	
	$scope.updatePosts = function(group) {
		
		activeService.updatePost(group).then(function(res) {
			console.log('Project updated');
			activeService.getActive().then(function(res) {
				$scope.activePosts = res.activePosts;
			})
		})
	}
	
	
	
})