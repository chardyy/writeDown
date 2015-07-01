angular.module('Listnr', ['appRoutes','mainCtrl', 'authService', 'userCtrl', 'userService', 'storyService', 'storyCtrl', 'allStoriesCtrl', 'profileCtrl', 'reverseDirective'])

.config(function($httpProvider){

	$httpProvider.interceptors.push('AuthInterceptor');

})