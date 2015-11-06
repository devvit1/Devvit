angular.module('devvit').controller('pseudoCtrl', function ($scope, $rootScope, pseudoService) {
   // billies id:"56380ba0090eed93c9b456a3"
	// jacobs id"56380bb0090eed93c9b456a4"
	
	
	



		var user1 = {
			//jacob
			_id: "563bbebacca522b5891ae46e"
		};
		
		//billy
		var user2 = {
			_id: "563be4b7a6c5ed5699f7a682"
		};
		
		//joe
		var user3 = {
<<<<<<< HEAD
			_id: "563ba3defebcf2de09bb6184"
=======
			_id: "563be0f604b29b0099885563"
>>>>>>> 744cbda427c314b7134448998006c3d2a4057e85
		}
		
		//billy
		var user4 = {
			_id: "563ba3effebcf2de09bb6185"
		}




	$rootScope.profile = user2;


 
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


