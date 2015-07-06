(function(){
	'use strict';

	angular.module('userCtrl', ['userService'])
		   .controller('UserController', UserController);

		   UserController.$inject = ['User'];

		   function UserController(User){
			
				var vm = this;

				//vm.processing = true;

				user.all()
					.success(function(data){
					//vm.processing = false;
					vm.users = data;
				});		   	
		   }
})();