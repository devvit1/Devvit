angular.module('devvit').controller('pseudoCtrl', function ($scope, $rootScope, pseudoService) {
 
	(function updateUser (){
		console.log('butt');
		pseudoService.getProfile().then(function(res){
			$rootScope.profile = res; 
			console.log(145, res)
		})()


 })
})

.service('pseudoService', function ($http){
	this.getProfile = function(){
		return $http({
				method: 'GET',
				url: '/active'
			}).then(function(res){
				console.log(res);
				return res.data
			})
	};
})


