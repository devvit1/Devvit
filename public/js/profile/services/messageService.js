angular.module('devvit').service('messageService', function($http){
	
	this.getMessages = function(active_user){
		return $http({
			method:'get',
			url: '/active/' + active_user	
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
	
	// this.getUser = function(user) {
	// 	return $http({
	// 		method: 'GET',
	// 		url: '/user/' + user
	// 	}).then(function(res) {
	// 		return res.data;
	// 	})
	// }
	
	this.addMessage = function(data) {
		return $http({
			method: 'PUT',
			url: '/addmessage',
			data: data
		}).then(function(res) {
			return res;
		})
	}
	
})