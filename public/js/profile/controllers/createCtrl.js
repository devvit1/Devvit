angular.module('devvit').controller('createCtrl', function($scope, createService, $rootScope){
	
	
	
	$scope.project = {
				"active_user_id":$rootScope.profile._id,
				"createdBy": $rootScope.profile._id,
				"name":null,
				"description": null,
				"subType":null,
				"type":null,
				"tags": null,
		}
	$scope.createProject = function(project){	
		console.log(project)		
		createService.createProject(project)
	}
	
	$scope.typeValue = function(type){
		if (type === "web"){
			$scope.selectedWeb = true;
			$scope.selectedMobile = false;
		}
		else{
			$scope.selectedWeb = false;
			$scope.selectedMobile = true;
		}
		$scope.project.type = type
	}
	
	$scope.typeSubOption = function (type){
		if (type === "personal"){
			$scope.selectedpers = true;
			$scope.selectedprof = false;
			$scope.selectedfree = false;
		}
		else if (type === "professional"){
			$scope.selectedpers = false;
			$scope.selectedprof = true;
			$scope.selectedfree = false;
		}
		else{
			$scope.selectedpers = false;
			$scope.selectedprof = false;
			$scope.selectedfree = true;			
		}
		$scope.project.subType = type
	}
	$scope.tags = [];
	var createTags = document.getElementById("createTags")
	
	$scope.createATag = function (theTag){
		$scope.tags.push(theTag)
		$scope.project.tags = $scope.tags
	}
	$scope.removeTag = function(item) { 

 		 var index = $scope.tags.indexOf(item);
 	 	$scope.tags.splice(index, 1);
		$scope.project.tags = $scope.tags     
	}
	
})