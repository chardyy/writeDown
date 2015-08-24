(function(){
    'use strict';

    angular.module('storyCtrl', ['storyService'])

    .controller('StoryController', function(Story, socketio){

        var vm = this;

        Story.allStory()
         .success(function(data){
            vm.stories = data;
         });

        vm.createStory = function(){
            console.log('new story');

            vm.message = '';

            vm.loading = true;
            Story.create(vm.storyData)
                 .success(function(data){
                    //clear up the form.
                    vm.loading = false;vm
                    vm.storyData = '';
                    vm.message = data.message;
                 });
        };

        socketio.on('story', function(data){
            vm.stories.push(data);
        });

    });
})();