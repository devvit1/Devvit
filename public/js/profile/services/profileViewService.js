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
			url: '/project',
			data: project
		}).then(function(res){
			
		})
	};
	this.getAllCat = function(){
		return $http({
			method:'get',
			url: '/getcat'
		}).then(function(res){
			return res.data
		})
	};
	this.unreadMess = function(){
		return $http({
			method:'get',
			url: '/unreadMessages'
		}).then(function(res){
			return res.data
		})
	}
})