angular.module('devvit').service('activeService', function($http, $rootScope) {
	this.getActive = function (){
	return $http({
		method:'GET',
		url: '/active',
	}).then(function(res) {

		return res.data
		})
	};
	
	this.getCurrentUser = function() {
		return $http({
			method: 'GET',
			url: '/user'
		}).then(function(res) {
			console.log(100, res)
			return res.data;
		})
	}
	
	this.deletePost = function (id) {
		return $http({
			method: 'DELETE',
			url: '/project/' + id
		})
	}
	
	
	
	// this.findProject = function(project_id){
	// 	return $http({
	// 		method:'get',
	// 		url: '/projects/' + project_id
	// 	})
	// }
	
	this.updatePost = function(id, name, description) {
		return $http({
			method: 'PUT',
			url: '/project/' + id,
			data: {
				name: name,
				description: description
			}
		})
	}
})