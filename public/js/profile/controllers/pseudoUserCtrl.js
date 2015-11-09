angular.module('devvit').controller('pseudoCtrl', function ($scope, $rootScope, pseudoService) {
   // billies id:"56380ba0090eed93c9b456a3"
	// jacobs id"56380bb0090eed93c9b456a4"
	
	
		var user1 = {
			//jacob
			_id: "5640d304e4b73c109cf17fa0"
		};

		//me
		var user2 = {

			_id: "5640d2f8e4b73c109cf17f9f"

		}
		
		//billy
		var user3 = {
			_id: "5640d311e4b73c109cf17fa1"
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


