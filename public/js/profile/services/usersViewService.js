angular.module('devvit').service('usersViewService', function($http){
	this.findUser = function(user){
	return $http({
		method:'get',
		url: '/users/'+user
	}).then(function(res){
		return res.data
	})
	}
})