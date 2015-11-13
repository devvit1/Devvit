angular.module('devvit').controller('pseudoCtrl', function ($scope, $rootScope, pseudoService) {



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


