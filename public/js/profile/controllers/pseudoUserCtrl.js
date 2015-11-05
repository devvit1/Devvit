angular.module('devvit').controller('pseudoCtrl', function ($scope, $rootScope) {
   // billies id:"56380ba0090eed93c9b456a3"
	// jacobs id"56380bb0090eed93c9b456a4"
	
	
	
	var user1 = {
		//jacob
		_id: "563abb2395fa9b14017c21d3",
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
	
	//billy
	var user2 = {
		_id: "563abb3095fa9b14017c21d4",
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
	
	//me
	var user3 = {
		_id: "563abb3895fa9b14017c21d5"
	}
	
	//squire
	var user4 = {
		_id: "563abb4195fa9b14017c21d6"
	}
	
	$rootScope.profile = user4;

});


