angular.module('devvit').controller('pseudoCtrl', function ($scope, $rootScope, pseudoService) {
   // billies id:"56380ba0090eed93c9b456a3"
	// jacobs id"56380bb0090eed93c9b456a4"
	
	
		var user1 = {
			//jacob
			_id: "563d35c90e74db4d1e6c37b4"
		};

		
		//jacob
		var user2 = {

			_id: "563d360446a0f06b1ea87b84"

		};

		//joe
		var user3 = {

			_id: "5641293b6c0c409d1ee863e9"

		}
		
		//billy
		var user4 = {
			_id: "563ba3effebcf2de09bb6185"
		}


	$rootScope.profile = user2;



 
	(function updateUser (who){
		pseudoService.getProfile(who).then(function(res){
			$rootScope.profile.username = res.basicInfo.userName; 
			console.log(res)
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


