angular.module('devvit').service('messageService', function($http){
	this.getMessages = function(active_user){
		return $http({
			method:'get',
			url: '/active/' + active_user	
		}).then(function(res){
			return res.data.messages
		})
	}
	this.getName = function(user){
		return $http({
			method:'get',
			url: '/active/' + user	
		}).then(function(res){
			return res.data.basicInfo
		})
		
	}
})