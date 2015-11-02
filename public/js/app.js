var app = angular.module('devvit', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/home/projects')
	
	$stateProvider
		.state('devvit', {
			url: '/home',
			templateUrl: '../templates/homeView.html',
			controller: 'projectViewCtrl'
		})
			.state('devvit.projects', {
				url: '/projects',
				templateUrl:'../templates/projectView.html',
				controller: 'projectViewCtrl'		
			})
		
			
		.state('profile', {
			url:'/profile',
			templateUrl:'../templates/profile.html',
			controller: 'profileCtrl'
		})
			.state('profile.about', {
				url:'/about/:user_id',
				templateUrl:'../templates/profileAbout.html',
				controller: 'basicInfoCtrl'
			})
			.state('profile.active', {
				url:'/active/:user_id',
				templateUrl:'../templates/profileActive.html',
				controller: 'activeCtrl'
			})
			.state('profile.pending', {
				url:'/pending/:user_id',
				templateUrl:'../templates/profilePending.html',
				controller: 'pendingCtrl'
			})
			.state('profile.groups', {
				url:'/groups/:user_id',
				templateUrl:'../templates/profileGroups.html',
				controller: 'groupsCtrl'
			})
			.state('profile.messages', {
				url:'/messages/:user_id',
				templateUrl:'../templates/profileMessages.html',
				controller: 'messageCtrl'
			})
			.state('profile.createProject', {
				url:'/createProject/:user_id',
				templateUrl:'../templates/createProject.html',
				controller: 'createCtrl'
			})													
})