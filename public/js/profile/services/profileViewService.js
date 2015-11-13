angular.module('devvit').service('profileViewService', function($http){
	this.updateUser = function(user) {
		return $http({
			method: 'PUT',
			url: '/user',
			data: user
		}).then(function(res){
			console.log('service', res)
		})
	}
})