var app = angular.module('devvit', ['ui-router']);

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/home')
	
	$stateProvider
		.state('devvit', {
			url: '/home',
			templateUrl: '../templates/projectView.html'
		})
})