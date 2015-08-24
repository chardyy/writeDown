(function(){
	'use strict';

		angular.module('Listnr', ['appRoutes','mainCtrl', 'authService', 'userCtrl', 'userCreateCtrl', 'commentCtrl', 'commentService', 'userService', 'storyService', 'storyCtrl', 'allStoriesCtrl', 'profileCtrl', 'profileService', 'reverseDirective', 'infinite-scroll'])

			   .config(function($httpProvider){

		$httpProvider.interceptors.push('AuthInterceptor');

	});

})();