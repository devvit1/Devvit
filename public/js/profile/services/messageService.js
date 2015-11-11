angular.module('devvit').service('messageService', function($http){
	
	this.getMessagesFromUser = function(other_user, active_user){
		return $http({
			method:'get',
			url: '/activeMessages/' + other_user + '/current/' + active_user	
		}).then(function(res){
			console.log(res);
			return res.data;
		})
	}
	
	this.getMessages = function(active_user){
		return $http({
			method:'get',
			url: '/activeMessageInfo/' + active_user	
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