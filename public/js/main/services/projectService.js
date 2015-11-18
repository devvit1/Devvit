angular.module('devvit').service('projectService', function($http){

	this.getProjects = function(){
		return $http({
			method: 'GET',
			url: '/projects' 
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
	
	this.searchProjects = function(query, distance){
		return $http({
			method: 'GET',
			url: '/ptsearch/?query='+query +'&dis='+distance
		}).then(function(res){
			return res.data
		})
	}
	
})