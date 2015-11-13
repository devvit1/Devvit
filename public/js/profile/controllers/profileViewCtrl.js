angular.module('devvit').controller('profileViewCtrl', function($scope, profileViewService, $rootScope){
	$scope.showEdit = false
	$scope.profileEditToggle = function(){
		$scope.showEdit = !$scope.showEdit
		return $scope.showEdit
	}
	$scope.updated={};
	$scope.updated.skills = $rootScope.profile.skills

	$scope.addToNewSkills = function (skill){
		console.log(skill)
		$scope.updated.skills.push(skill)
	}
	$scope.removeSkill = function(skill){
		 var index = $scope.updated.skills.indexOf(skill);
 	 	$scope.updated.skills.splice(index, 1);
	}
	$scope.updateUser = function (){
		$rootScope.profile.skills = $scope.updated.skills;
		profileViewService.updateUser($rootScope.profile).then(function(res){
			console.log('cont', res)
		})
	}
})