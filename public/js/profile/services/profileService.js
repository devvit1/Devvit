angular.module('devvit').service('profileService', function($http){
	var url = 'https://devvit.firebaseio.com'
	
	this.getProfile = function(){
			return $http({
				method: 'GET',
				url: '/active'
			}).then(function(response){
				console.log(response, 'active user data')
			})
	};
})