var app = angular.module('devvit', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/home/web')
	
	$stateProvider
		.state('devvit', {
			url: '/home',
			templateUrl: '../templates/projectView.html'
		})
			.state('devvit.web', {
				url: '/web',
				templateUrl:'../templates/projectView.html'
			})
		.state('profile', {
			url:'/profile/:user_id',
			templateUrl:'../templates/profile.html'
		})
})