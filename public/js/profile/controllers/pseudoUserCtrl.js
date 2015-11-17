angular.module('devvit').controller('pseudoCtrl', function ($scope, $rootScope, pseudoService) {
   // billies id:"56380ba0090eed93c9b456a3"
	// jacobs id"56380bb0090eed93c9b456a4"
	
	
		var user1 = {
			//Antonio
			_id: "56426fdc8a257ad890c0c06f"
		};

		//Jacob
		var user2 = {
			_id: "5645662b652466734cf661eb"
		};

		//Billy
		var user3 = {
			_id: "56479797cbff247c24ea3243"
		}
		//anton
		var user4 = {
			_id: "5647977ecbff247c24ea3242"
		}

			
	$rootScope.profile = user1;


	(function updateUser (){
		pseudoService.getProfile().then(function(res){


 

			$rootScope.profile = res;
			console.log(res)
			$rootScope.profile.username = res.basicInfo.userName; 
			console.log("rootScope - ", $rootScope.profile )

		})
		})()


})

.service('pseudoService', function ($http){
	this.getProfile = function(){
		return $http({
				method: 'GET',
				url: '/active' 
			}).then(function(res){
				return res.data
			})
	};
})


