angular.module('devvit').service('groupsService', function($http, $rootScope){

	this.getGroups = function (){
		
		return $http({
			method:'get',
			url: '/active'
		}).then(function(res){
			return res.data
			})
	};
	
	this.findProject = function(project_id){
		return $http({
			method:'get',
			url: '/project/' + project_id
		})
	}
	
})
