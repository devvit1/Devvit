angular.module('devvit').controller('pseudoCtrl', function ($scope, $rootScope, pseudoService) {
   // billies id:"56380ba0090eed93c9b456a3"
	// jacobs id"56380bb0090eed93c9b456a4"
	
	
	
	var user1 = {
		_id: "563a816a5987e82d21d016ba"

	};
	
	//billy
	var user2 = {
		_id: "563a81dcbe6ca97421646b95"
		
	};
	

	//joe
	var user3 = {
		_id: "563adfc722941f294e2e34a4"
	}
	
	//billy
	var user4 = {
		_id: "563adfba22941f294e2e34a3"
	}
	
	$rootScope.profile = user3;


 $rootScope.profile = user3;
 
	(function updateUser (who){
		pseudoService.getProfile(who).then(function(res){
			$rootScope.profile.username = res.basicInfo.userName; 
		})
		})($rootScope.profile._id)


})

.service('pseudoService', function ($http){
	this.getProfile = function(active_user_id){
		return $http({
				method: 'GET',
				url: '/active/' + active_user_id 
			}).then(function(res){
				return res.data
			})
	};
})


