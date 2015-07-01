angular.module('profileCtrl', ['profileService'])

.controller('ProfileController', function(Profile){

	var vm = this;

	Profile.update()
		   .success(function(data){
		   		vm.user = data;
		   })
	
})