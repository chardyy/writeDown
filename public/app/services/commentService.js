(function(){
    'use strict';

    angular.module('commentService', [])
        .factory('Comment', function($http){

        var service = {
            createComment: createComment,
            allComment: allComment
        };

        function createComment(commentData){
            return $http.post('/api/comment', commentData);
        }

        function allComment(){
            return $http.get('/api/comment');
        }
        return service;
    });

})();