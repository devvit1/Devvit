angular.module('devvit').controller('profileViewCtrl', function($scope, profileViewService, $rootScope, $q){
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
	$scope.removePending = function (pendingGroup){
				for (var i = 0; i < $rootScope.profile.pendingApprovals.length; i++){
					if (pendingGroup._id === $rootScope.profile.pendingApprovals[i]._id){
						$rootScope.profile.pendingApprovals.splice(i,1)
						profileViewService.updateUser($rootScope.profile).then(function(res){
							console.log(res)
						})
					}
				}
		for(var i = 0; i < pendingGroup.members.length; i++){
			if(pendingGroup.members[i]._id === $rootScope.profile._id){
				pendingGroup.members[i].splice(i, 1);
				profileViewService.updateProject(pendingGroup).then(function(res){
					console.log(res, 'project')
				})
			}
		}
			
		profileViewService.updateUser($rootScope.profile).then(function(res){
			console.log('removePending', res)
		})
	}
			
	$scope.updateUser = function (callback){
		$rootScope.profile.skills = $scope.updated.skills;
			$scope.userLocation(
				$rootScope.profile.basicInfo.location.city,
				$rootScope.profile.basicInfo.location.state,
				$rootScope.profile.basicInfo.location.country)
			
		// preUpdateUser().then(function(res){
		// 	profileViewService.updateUser($rootScope.profile).then(function(res){
		// 		console.log(res)
		// 	})
		// })
	}
	
	$scope.userLocation =function(city, state, country){
            var geocoder =  new google.maps.Geocoder();
    		geocoder.geocode( { 'address': city +', '+state+', '+country}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            $rootScope.profile.basicInfo.location.lat= results[0].geometry.location.lat() 
			 $rootScope.profile.basicInfo.location.lon=results[0].geometry.location.lng();
			 profileViewService.updateUser($rootScope.profile).then(function(res){
				console.log(res)
			})
			// $scope.disfrom = distance($scope.lat, $scope.long, 40.2988, -111.6965, "M")
          } else {
            alert("Something got wrong " + status);
			profileViewService.updateUser($rootScope.profile).then(function(res){
				console.log(res)
			})
          }
        });
	}
	
	

	
})