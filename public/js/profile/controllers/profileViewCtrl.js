angular.module('devvit').controller('profileViewCtrl', function($scope, profileViewService, $rootScope){
	$scope.showEdit = false
	$('#slideDown').hide();
	$scope.toggleaddSkills = function(){
		$('#slideDown').slideToggle('fast');
	}
	$scope.profileEditToggle = function(){
		$scope.showEdit = !$scope.showEdit
		return $scope.showEdit
	}
	$scope.updated={};
	$scope.updated.skills = $rootScope.profile.skills

	$scope.addToNewSkills = function (skill){
		$rootScope.profile.skills.push(skill)
		profileViewService.updateUser($rootScope.profile).then(function(res){

		})
	}
	$scope.addBio = function (bio){
		$rootScope.profile.bio = bio
		profileViewService.updateUser($rootScope.profile).then(function(res){

		})
	}
	
	$scope.removeSkill = function(skill){
		 var index = $rootScope.profile.skills.indexOf(skill);
 	 	$rootScope.profile.skills.splice(index, 1);
		  profileViewService.updateUser($rootScope.profile).then(function(res){

		})
	}
	$scope.updateUser = function (){
		$rootScope.profile.skills = $scope.updated.skills;
		profileViewService.updateUser($rootScope.profile).then(function(res){
			console.log('cont', res)
		})
	}
})