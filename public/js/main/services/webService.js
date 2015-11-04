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
	
})