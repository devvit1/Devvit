angular.module('devvit').service('createService', function($http){
	var url = 'https://devvit.firebaseio.com';
	
	this.createProject = function(project){
		
		$http({
			method:'post',
			url: url + '/projects.json',
			data: project
		})

	}
	
	this.createGroup = function(project){
		
		var groupData = {
			name:project.name,
			creator_id:project.creator_id,
			members:[project.creator_id]
			
		}
		
		$http({
			method:'post',
			url: url + '/groups.json',
			data:groupData

		})
		
	}

	
})