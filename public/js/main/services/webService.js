angular.module('devvit').service('projectService', function($http){

	this.getWebProjects = function(type){
		return $http({
			method: 'GET',
			url: '/projects/' + type
		}).then(function(res) {
			console.log(res);
			return res.data;
		})
	}
	
	this.applyToProject = function(info) {
		return $http({
			method: 'PUT',
			url: '/projects',
			data: info
		}).then(function(res) {
			console.log(res);
		})
	}
	
})