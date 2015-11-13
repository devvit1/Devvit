angular.module('devvit').controller('pseudoCtrl', function ($scope, $rootScope, pseudoService) {
//    billies id:"56380ba0090eed93c9b456a3"
// 	jacobs id"56380bb0090eed93c9b456a4"
	
	

// 		var user1 = {
// 			//jacob
// 			_id: "56426fdc8a257ad890c0c06f"
// 		};

		
// 		//jacob
// 		var user2 = {

// 			_id: "563d360446a0f06b1ea87b84"

// 		};

// 		//joe
// 		var user3 = {

// 			_id: "56413a676364be6a2d682c05"

// 		}
		
// 		//billy
// 		var user4 = {
// 			_id: "56413a606364be6a2d682c04"
// 		}


 

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


