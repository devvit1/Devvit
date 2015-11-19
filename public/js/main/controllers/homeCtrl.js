angular.module('devvit').controller('homeCtrl', function($scope, $location){
	$scope.isActive = function(route) {
		return route === $location.path();
	};
	$("#groupSubMenu").hide();
	
	$scope.slideInGroups = function(elem){
		$("#groupSubMenu").slideToggle('fast');
	}
// 	$(window).scroll(function () {
//     if ($(window).scrollTop() > 50) {
//         $('#scroller').css('top', $(window).scrollTop());
//     }
// }
// )

$(document).ready(function() {
var stickyNavTop = $('.home_header2').offset().top;
 
var stickyNav = function(){
var scrollTop = $(window).scrollTop();
      
if (scrollTop > stickyNavTop) { 
    $('.home_header2').addClass('sticky');
} else {
    $('.home_header2').removeClass('sticky'); 
}
};
 
stickyNav();
 
$(window).scroll(function() {
    stickyNav();
});
});
})