var app = angular.module('devvit', ['ui.router', 'angularMoment']);

app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/home/web')

	$stateProvider
		.state('devvit', {
			url: '/home',
			templateUrl: '../templates/homeView.html',
			controller: 'homeCtrl'
		})
			.state('devvit.web', {
				url: '/web',
				templateUrl:'../templates/webView.html',
				controller: 'webViewCtrl'
			})
			
			.state('devvit.mobile', {
				url: '/mobile',
				templateUrl:'../templates/mobileView.html',
				controller: 'mobileViewCtrl'
			})

		.state('profile', {
			url:'/profile',
			templateUrl:'../templates/profile.html',
			controller: 'profileCtrl'
		})
			.state('profile.login-register', {
				url:'/login-register',
				templateUrl: '../templates/log_Reg.html',
				controller: 'log_RegCtrl'
			})
			.state('profile.about', {
				url:'/about/:user_id',
				templateUrl:'../templates/profileAbout.html',
				controller: 'basicInfoCtrl'
			})
			.state('profile.active', {
				url:'/active/:user_id',
				templateUrl:'../templates/profileActive.html',
				controller: 'activeCtrl',
				resolve: {
					activeUser: function(activeService, $rootScope) {
						return activeService.getActive($rootScope.profile._id);
					}
				}
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
