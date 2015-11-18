angular.module('devvit').service('profileViewService', function($http){
	this.updateUser = function(user) {
		return $http({
			method: 'PUT',
			url: '/user',
			data: user
		}).then(function(res){
			return res.data
		})
	};
	this.updateProject = function(project) {
		return $http({
			method: 'PUT',
			url: '/user',
			data: project
		}).then(function(res){
			
		})
	}
})