(function(){
	'use strict';
	
	angular.module('allStoriesCtrl', ['storyService'])

	.controller('AllStoriesController', function(stories, socketio){

	var vm = this;

	vm.stories = stories.data;

	socketio.on('story', function(data){
		vm.stories.push(data);
	});

	});

	//end controller

})();