angular.module('devvit').controller('pseudoCtrl', function ($scope, $rootScope, pseudoService) {
   // billies id:"56380ba0090eed93c9b456a3"
	// jacobs id"56380bb0090eed93c9b456a4"
	
	
	
		var user1 = {
			//jacob
			_id: "563abb2395fa9b14017c21d3"
		};
		
		//billy
		var user2 = {
			_id: "563abb3095fa9b14017c21d4"
		};
		
		//joe
		var user3 = {
			_id: "563ba3defebcf2de09bb6184"
		}
		
		//billy
		var user4 = {
			_id: "563ba3effebcf2de09bb6185"
		}



	$rootScope.profile = user4;


 
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


