angular.module('devvit').service('groupsService', function($http){
	
	var url = 'https://devvit.firebaseio.com'


	this.getGroups = function (user_id){
		$http({
			method:'GET',
			url: url + '/profiles/' + user_id + '/groups'
		})
	}
	
})