angular.module('devvit').controller('pseudoCtrl', function ($scope, $rootScope) {
   // billies id:"56380ba0090eed93c9b456a3"
	// jacobs id"56380bb0090eed93c9b456a4"
	
	
	
	var user1 = {
		_id: "563a50e3d342dbc42ca375f6",
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
		_id: "563975e7ee9a28bbd75e1591",
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
	
	$rootScope.profile = user2;

});


