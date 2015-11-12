angular.module('devvit').service('pendingAppService', function($http){
	
	this.getPending = function(){
		return $http({
			method:'GET',
			url: '/active'
		}).then(function(res){
			return res.data;
		})
	}
	
	this.getProjects = function(proj){
		return $http({
			method:'GET',
			url: '/project/' + proj	
		}).then(function(res){
			return res;
		})
	}
	
})