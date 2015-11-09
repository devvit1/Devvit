angular.module('devvit').controller('homeCtrl', function($scope, $location){
	$scope.isActive = function(route) {
		return route === $location.path();
	};
	
	$("#slideInOut").hide();
	
	$scope.slideInSearch = function(elem){
		$("#slideInOut").slideToggle('slow');
	}
// 	$(window).scroll(function () {
//     if ($(window).scrollTop() > 50) {
//         $('#scroller').css('top', $(window).scrollTop());
//     }
// }
// )
})