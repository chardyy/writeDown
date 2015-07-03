(function(){
    'use strict';

        angular.module('profileCtrl', ['profileService'])
               .controller('ProfileController', function(Profile){

                    var vm = this;

                    Profile.update()
                           .success(function(data){
                                vm.user = data;
                           });

                    vm.updateUser = function(){
                        vm.message = '';
                        Profile.update(vm.profileData)
                            .success(function(data){

                                vm.profileData = '';
                                vm.message = data.message;
                            });
                    };
                });
})();