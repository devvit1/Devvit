angular.module('devvit').service('activeService', function($http, $rootScope) {
	this.getActive = function (){
	return $http({
		method:'GET',
		url: '/active'
	}).then(function(res) {

		return res.data
		})
	};
	
	this.deletePost = function (id) {
		return $http({
			method: 'DELETE',
			url: '/project/' + id
		})
	}
	
	this.updatePost = function(group) {
		return $http({
			method: 'PUT',
			url: '/project',
			data: group
		})
	}
	
})