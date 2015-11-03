angular.module('devvit').controller('profileCtrl', function($scope, $location, $rootScope, profileService){
	$scope.isActive = function(route) {
		return route === $location.path();
	};
	
	$rootScope.profile = {
		_id: "56380ba0090eed93c9b456a3",
		basicInfo:{
			name:{
				first:"jacob",
				last:"talley",
			},
			username:"kingPlebeian"
		},
		pendingReq:[2],
		requests:[],
		groups:[]
	};
	
	$scope.getProfile = function(data){
		profileService.getProfile(data)
	}
		
	
})