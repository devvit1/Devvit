angular.module('devvit').service('imageService', function($http) {
	this.uploadImage = function(filebody, file) {
		var image = {
			filename: file.name,
			filebody: filebody,
			filetype: file.type
		}
		return $http({
			method: 'POST',
			url: '/fileUpload',
			data: image
		})
	}
})