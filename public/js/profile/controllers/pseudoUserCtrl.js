angular.module('devvit').controller('pseudoCtrl', function ($scope, $rootScope) {
   // billies id:"56380ba0090eed93c9b456a3"
	// jacobs id"56380bb0090eed93c9b456a4"
	
	
	
	var user1 = {
		_id: "563939ebbc845f481268be10",
		basicInfo:{
			name:{
				first:"jacob",
				last:"talley",
			},
			username:"user 1"
		},
		pendingReq:[2],
		requests:[],
		groups:[]
	};
	
	var user2 = {
		_id: "563939d8bc845f481268be0f",
		basicInfo:{
			name:{
				first:"billy",
				last:"mech",
			},
			username:"user 2"
		},
		pendingReq:[2],
		requests:[],
		groups:[]
	};
	
	$rootScope.profile = user1;
});