angular.module('devvit').controller('pseudoCtrl', function ($scope, $rootScope, pseudoService) {
   // billies id:"56380ba0090eed93c9b456a3"
	// jacobs id"56380bb0090eed93c9b456a4"
	
	
		var user1 = {
			//jacob
			_id: "56438980f88fd9f66020668e"
		};

		//me
		var user2 = {
			_id: "56438970f88fd9f66020668c"
		};

		//billy
		var user3 = {
			_id: "56438978f88fd9f66020668d"
		}


	$rootScope.profile = user1;



 
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


