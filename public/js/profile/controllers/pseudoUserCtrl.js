angular.module('devvit').controller('pseudoCtrl', function ($scope, $rootScope) {
   // billies id:"56380ba0090eed93c9b456a3"
	// jacobs id"56380bb0090eed93c9b456a4"
	
	
	
	var user1 = {
		_id: "563a816a5987e82d21d016ba",
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
		_id: "563a81dcbe6ca97421646b95",

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
	var user3 = {
		_id: "563a928d9257ccc12ca31bd4",
		basicInfo:{
		
			username:"user 3"
		}
	}
	
	$rootScope.profile = user1;

});


