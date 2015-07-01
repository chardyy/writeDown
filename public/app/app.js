angular.module('Listnr', ['appRoutes','mainCtrl', 'authService', 'userCtrl', 'userService', 'storyService', 'storyCtrl', 'allStoriesCtrl', 'reverseDirective'])

.config(function($httpProvider){

	$httpProvider.interceptors.push('AuthInterceptor');

})