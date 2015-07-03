(function(){
	'use strict';

	angular.module('profileService', [])
	.factory('Profile', function($http){

		var profileFactory = {};

		profileFactory.update = function(profileData){
			return $http.put('/profile', profileData);
		};

		return profileFactory;
	});

})();