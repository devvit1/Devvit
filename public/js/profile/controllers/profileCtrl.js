angular.module('devvit').controller('profileCtrl', function($scope, $location, $rootScope, profileService){
	$scope.isActive = function(route) {
		return route === $location.path();
	};
	
	$rootScope.profile = {
		_id: 'K248bYkMsiHp96ORIOd',
		basicInfo:{
			name:{
				first:"jacob",
				last:"talley",
			},
			username:"kingPlebeian"
		},
		pendingReq:[2],
		requests:[{name:"johnny"}],
		groups:['references']
	};
	
	$scope.getProfile = function(data){
		profileService.getProfile(data)
	}
		
	
})