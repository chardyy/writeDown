(function(){
	'use strict';
	
	angular.module('allStoriesCtrl', ['storyService'])

	.controller('AllStoriesController', function(stories, socketio){

	var vm = this;

    vm.stories = [];
    vm.counter = 0;

    vm.nextStory = function(){
        console.log('a new request');
        var last = vm.stories[vm.stories.length - 1];

        for (var i = 0; i < stories.length; i++){
            vm.stories.push(last + 1);
        }
    };

    vm.nextStory();

	vm.stories = stories.data;

	socketio.on('story', function(data){
		vm.stories.push(data);
	});

	});

	//end controller

})();