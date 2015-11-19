angular.module('devvit').service('devService', function($http, $state){

	this.findUsers = function(query, distance){
		return $http({
			method: 'GET',
			url: '/getusers/?query='+query +'&dis='+ distance
		}).then(function(res) {
			console.log(2, res.data);
			return res.data;
		})
	}
	
	this.isAuth = function() {
		return $http({
			method: 'GET',
			url: '/isAuth'
		}).then(function(success) {
			console.log(55, 'success');
			return success;
		}, function(err) {
			if (err.status === 401) {
				// $state.go('login-register')
				$state.go('login')
			console.log('Not AUTHENTICATED!!1!')
			}
		})
	}
	
	
})