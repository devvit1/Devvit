angular.module('devvit').service('messageService', function($http){
	this.getMessages = function(){
		return $http({
			method:'get',
			url: '/active'	
		}).then(function(res){
			return res.data
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