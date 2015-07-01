angular.module('profileCtrl', ['profileService'])

.controller('ProfileController', function(Profile){

	var vm = this;

	newUser.update()
		   .success(function(data){
		   		vm.user = data;
		   })
	
})