angular.module('devvit').service('projectService', function($http){

	this.getProjects = function(type){
		return $http({
			method: 'GET',
			url: '/projects/' + type
		}).then(function(res) {

			return res.data;
		})
	}
	
	this.applyToProject = function(info) {
		return $http({
			method: 'PUT',
			url: '/projects',
			data: info
		}).then(function(res) {

		})
	},
	
	this.searchProjects = function(query){
		return $http({
			method: 'GET',
			url: '/ptsearch/'+query
		}).then(function(res){
			return res.data
		})
	}
	
})