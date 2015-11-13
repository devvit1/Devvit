var app = angular.module('devvit', ['ui.router', 'angularMoment']);

app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/home/web')

	$stateProvider
		.state('devvit', {
			url: '/home',
			templateUrl: '../templates/homeView.html',
			controller: 'homeCtrl',
			resolve: {
				isAuth: function(devService) {
					return devService.isAuth().then(function(res){
						return res;
						})
					}
			}
		})
		.state('devvit.profile', {
				url: '/profile',
				templateUrl:'../templates/profileView.html',
				controller: 'profileViewCtrl'
			})
			.state('devvit.web', {
				url: '/web',
				templateUrl:'../templates/webView.html',
				controller: 'webViewCtrl'
				// resolve: {
				// isAuth: function(devService) {
				// 	return devService.isAuth().then(function(res){
				// 		return res;
				// 		})
				// 	}
				// }
			})
			
			.state('devvit.mobile', {
				url: '/mobile',
				templateUrl:'../templates/mobileView.html',
				controller: 'mobileViewCtrl'
				// resolve: {
				// isAuth: function(devService) {
				// 	return devService.isAuth().then(function(res){
				// 		return res;
				// 		})
				// 	}
				// }
			})
			.state('devvit.developers', {
				url: '/developers',
				templateUrl:'../templates/developersView.html',
				controller: 'developersCtrl'
				// resolve: {
				// 	isAuth: function(devService) {
				// 		return devService.isAuth().then(function(res){
				// 			return res;
				// 		})
				// 	}
				// }
			})
		.state('login-register', {
			url:'/login-register',
			templateUrl: '../templates/log_Reg.html',
			controller: 'log_RegCtrl'
			// resolve: {
			// isAuth: function(devService) {
			// 	return devService.isAuth().then(function(res){
			// 		return res;
			// 		})
			// 	}
			// }
		})

		.state('profile', {
			url:'/profile',
			templateUrl:'../templates/profile.html',
			controller: 'profileCtrl',
			resolve: {
				isAuth: function(devService) {
					return devService.isAuth().then(function(res){
						return res;
						})
					}
				}
		})

			.state('profile.about', {
				url:'/about/:user_id',
				templateUrl:'../templates/profileAbout.html',
				controller: 'basicInfoCtrl',
			})
			.state('devvit.active', {
				url:'/active/:user_id',
				templateUrl:'../templates/profileActive.html',
				controller: 'activeCtrl',
				resolve: {
				// isAuth: function(devService) {
				// 	return devService.isAuth().then(function(res){
				// 		return res;
				// 		})
				// 	}
					ActiveUser: function(activeService, $rootScope) {
						return activeService.getActive().then(function(res) {
							$rootScope.profile = res;
						})
					}
				}
			})
			.state('devvit.pending', {
				url:'/pending',
				templateUrl:'../templates/profilePending.html',
				controller: 'pendingCtrl'
				// resolve: {
				// isAuth: function(devService) {
				// 	return devService.isAuth().then(function(res){
				// 		return res;
				// 		})
				// 	}
				// }
			})
			.state('devvit.groups', {
				url:'/groups',
				templateUrl:'../templates/profileGroups.html',
				controller: 'groupsCtrl'
				// resolve: {
				// isAuth: function(devService) {
				// 	return devService.isAuth().then(function(res){
				// 		return res;
				// 		})
				// 	}
				// }
			})
				.state('devvit.groupdisplay', {
					url:'/group/:group',
					templateUrl:'../templates/profileGroupsSub.html',
					controller: 'groupDisplayCtrl',
					resolve: {
						groupInfo: function ($stateParams, groupsService) {
							 return groupsService.findProject($stateParams.group)
						}
					// 	isAuth: function(devService) {
					// 		return devService.isAuth().then(function(res){
					// 			return res;
					// 		})
					// 	}
					// }
					}
				})

				.state('devvit.groupdisplayAdmin', {
					url:'/groupadmin/:group',
					templateUrl:'../templates/profileGroupsAdminSub.html',
					controller: 'groupDisplayAdminCtrl'
					// resolve: {
					// 	groupInfo: function ($stateParams, groupsService) {
					// 		 return groupsService.findProject($stateParams.group)
					// 	}
					// }
				})
			.state('devvit.messages', {
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
			.state('devvit.messages.current', {
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
			.state('devvit.messages.newmessage', {
				url:'/messages',
				templateUrl:'../templates/profileMessagesCompose.html',
				controller: 'messageSearchCtrl'
			})

			.state('devvit.createProject', {
				url:'/createProject',
				templateUrl:'../templates/createProject.html',
				controller: 'createCtrl'
				// resolve: {
				// 	isAuth: function(createService) {
				// 		return createService.isAuth = function(res) {
				// 			return res;
				// 		}
				// 	}
				// }
			})
})
