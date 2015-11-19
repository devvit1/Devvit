angular.module('devvit').service('messageService', function($http){
	
	this.getMessagesFromUser = function(other_user){
		return $http({
			method:'get',
			url: '/activeMessages/' + other_user + '/current/'
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
	
	this.addMessage = function(data) {
		return $http({
			method: 'PUT',
			url: '/addmessage',
			data: data
		}).then(function(res) {
			return res;
		})
	}
	
	this.newMessage = function(data) {
		return $http({
			method: 'PUT',
			url: '/newmessage',
			data: data
		}).then(function(res) {
			return res;
		})
	}
	this.markAsRead = function(user){
		console.log(user)
		return $http({
			method: 'PUT',
			url: '/rm',
			data:{'user':user}
		}).then(function(res) {
			return res;
		})
	}
	
})