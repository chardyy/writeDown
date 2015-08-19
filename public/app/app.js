(function(){
	'use strict';

		angular.module('Listnr', ['appRoutes','mainCtrl', 'authService', 'userCtrl', 'userCreateCtrl', 'commentCtrl', 'commentService', 'userService', 'storyService', 'storyCtrl', 'allStoriesCtrl', 'profileCtrl', 'profileService', 'reverseDirective'])

			   .config(function($httpProvider){

		$httpProvider.interceptors.push('AuthInterceptor');

	});

})();