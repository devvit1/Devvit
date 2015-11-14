angular.module('devvit').service('imageService', function($http) {
	this.uploadImage = function(filebody, file) {
		var data = {
			filename: file.name,
			filebody: filebody,
			filetype: file.type
		}
		return $http({
			method: 'POST',
			url: '/fileUpload',
			data: data
		}).then(function(res) {
			console.log('AMAZON!!', res);
		})
	}
})