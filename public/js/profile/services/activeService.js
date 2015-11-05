angular.module('devvit').service('activeService', function($http, $rootScope) {
		this.getActive = function (active_user_id){
		console.log(34, active_user_id);
		return $http({
			method:'GET',
			url: '/active/'+ active_user_id
		}).then(function(res) {
			console.log(10, res);
			return res.data
			})
	};
	
	// this.findProject = function(project_id){
	// 	return $http({
	// 		method:'get',
	// 		url: '/projects/' + project_id
	// 	})
	// }
})