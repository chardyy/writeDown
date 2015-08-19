(function(){
    'use strict';

    angular.module('commentCtrl', ['commentService', 'storyService'])
        .controller('CommentController', function(Comment, socketio, $scope){

        //var vm = this;

        $scope.comments = [];

        Comment.allComment()
            .success(function(data){
           $scope.comments = data;
        });

        $scope.addComment = function(){
            console.log('New Comment Created');

            $scope.message = '';
            $scope.loading = true;
            Comment.createComment($scope.commentData)
                .success(function(data){
                    $scope.loading = false;
                    $scope.commentData = '';
                    $scope.message = data.message;
                });
        };

        socketio.on('comment', function(commentData){
            $scope.comments.push(commentData);
        });
    })
})();