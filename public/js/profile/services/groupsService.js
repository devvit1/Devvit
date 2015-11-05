angular.module('devvit').service('groupsService', function($http, $rootScope){

	this.getGroups = function (active_user_id){
		console.log(32, active_user_id);
		return $http({
			method:'get',
			url: '/active/'+ active_user_id
		}).then(function(res){return res.data})
	};
	
	this.findProject = function(project_id){
		return $http({
			method:'get',
			url: '/projects/' + project_id
		})
	}
	
})
