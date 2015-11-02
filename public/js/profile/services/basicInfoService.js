angular.module('devvit').service('basicInfoService', function($http){
	var url = 'https://devvit.firebaseio.com';
	
	this.addProfile = function(data){
		return $http({
			method: 'POST',
			url: url + '/profiles.json',
			data: data
		}).then(function(response){

		})
	};
	
	
})