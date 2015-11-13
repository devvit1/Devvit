angular.module('devvit').service('imageService', function($http) {
	this.uploadImage = function(data) {
		return $http({
			method: 'POST',
			url: '/fileUpload',
			data: data
		}).then(function(res) {
			console.log('AMAZON!!', res);
		})
	}
})