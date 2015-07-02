angular.module('profileService', [])


.factory('Profile', function($http){

	var profileFactory = {};

	profileFactory.update = function(profileData){
		return $http.put('/api', profileData);
	}

	return profileFactory;
});