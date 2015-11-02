angular.module('devvit').service('profileService', function($http){
	var url = 'https://devvit.firebaseio.com'
	
	this.getProfile = function(data){
			return $http({
				method: 'GET',
				url: url + '/profiles/' + data +'.json'
			}).then(function(response){

			})
	};
})