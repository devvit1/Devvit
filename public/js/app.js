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
			.state('devvit.developers', {
				url: '/developers',
				templateUrl:'../templates/developersView.html',
				controller: 'developersCtrl'
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
				url:'/pending',
				templateUrl:'../templates/profilePending.html',
				controller: 'pendingCtrl'
			})
			.state('profile.groups', {
				url:'/groups',
				templateUrl:'../templates/profileGroups.html',
				controller: 'groupsCtrl'
			})
				.state('profile.groupdisplay', {
					url:'/group/:group',
					templateUrl:'../templates/profileGroupsSub.html',
					controller: 'groupDisplayCtrl',
					resolve: {
						groupInfo: function ($stateParams, groupsService) {
							 return groupsService.findProject($stateParams.group)
						}
					}
				})
				.state('profile.groupdisplayAdmin', {
					url:'/groupadmin/:group',
					templateUrl:'../templates/profileGroupsAdminSub.html',
					controller: 'groupDisplayAdminCtrl',
					resolve: {
						groupInfo: function ($stateParams, groupsService) {
							 return groupsService.findProject($stateParams.group)
						}
					}
				})
			.state('profile.messages', {
				url:'/messages',
				templateUrl:'../templates/profileMessages.html',
				controller: 'messageCtrl',
				// resolve: {
				// 	getMessages: function(messageService, $rootScope) {
				// 		return messageService.getMessages($rootScope.profile._id).then(function(resp) {
				// 			return resp.data.messages;
				// 		});
				// 	}
				// }
			})
			.state('profile.messages.current', {
				url:'/messages/:id',
				templateUrl:'../templates/profileMessagesCurrent.html',
				controller: 'messageCurrentCtrl',
				resolve: {
					currentIndex: function($stateParams, messageService, $rootScope) {
						return messageService.getMessagesFromUser($stateParams.id, $rootScope.profile._id)
					},
					
					fromId: function($stateParams) {
						var newId = $stateParams.id.toString();
						return newId;
					}
				}
			})
			.state('profile.messages.newmessage', {
				url:'/messages',
				templateUrl:'../templates/profileMessagesCompose.html',
				controller: 'messageSearchCtrl'
			})
			.state('profile.createProject', {
				url:'/createProject',
				templateUrl:'../templates/createProject.html',
				controller: 'createCtrl'
			})
})
