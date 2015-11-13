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
	
	

})