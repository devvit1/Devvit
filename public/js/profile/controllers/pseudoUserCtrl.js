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
	
	//james
	var user3 = {
		_id: "563add8a0a264e2f4c072e15"
	}
	
	//billy
	var user4 = {
		_id: "563add7e0a264e2f4c072e14"
	}
	
	$rootScope.profile = user3;

});


