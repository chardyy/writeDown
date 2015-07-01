angular.module('profileCtrl', ['profileService'])

.controller('ProfileController', function(Profile){

	var vm = this;

	profile.update()
		   .success(function(data){
		   		vm.user = data;
		   })
	
})