angular.module('devvit').service('basicInfoService', function($http){
	var url = 'https://devvit.firebaseio.com';
	
	this.getProfile = function(active_user_id){
		return $http({
				method: 'GET',
				url: '/active/' + active_user_id 
			}).then(function(res){
				return res.data
			})
	};

	this.updateProfile = function(profile) {
		console.log(33, profile);
		return $http({
			method: 'PUT',
			url: '/user/' + profile._id,
			data: {basicInfo: profile.basicInfo}
		})
	}
	
	
})