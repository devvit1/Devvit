angular.module('devvit').service('createService', function($http, $state){
	// var url = 'https://devvit.firebaseio.com';
	
	this.createProject = function(project){	
		return $http({
			method:'post',
			url: '/projects',
			data: project
		}).then(function(res){console.log(res)})

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
				$state.go('devvit')
			console.log('Not AUTHENTICATED!!1!')
			
			}
		})
	}
	
})