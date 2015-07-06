(function(){
	'use strict';

	angular.module('userCreateCtrl', ['userService'])
		   .controller('UserCreateController', UserCreateController);

		   UserCreateController.$inject = ['User' , '$location', '$window'];

		   
		   function UserCreateController(User, $location, $window){

		   		var vm = this;

		   		vm.signupUser = function(){
					vm.message = '';

					User.create(vm.userData)
						.then(function(response){
							vm.userData = {};
							vm.message = response.data.message;

							$window.localStorage.setItem('token', response.data.token);
							$location.path('/');
					});
				};
		    }

})();