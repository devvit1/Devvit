angular.module('devvit').service('devService', function($http, $state){

	this.findUsers = function(search){
		return $http({
			method: 'GET',
			url: '/getusers/' + search
		}).then(function(res) {
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
				$state.go('devvit.web')
			console.log('Not AUTHENTICATED!!1!')
			}
		})
	}
	
	
})