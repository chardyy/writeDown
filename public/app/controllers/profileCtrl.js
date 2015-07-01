angular.module('profileCtrl', ['profileService'])

.controller('ProfileController', function(Profile, User){

	var vm = this;

	user.update()
		   .success(function(data){
		   		vm.user = data;
		   })
	
})