(function(){
    'use strict';

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var CommentSchema = new Schema({

        commented_by: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        commented_story:{
          type: Schema.Types.ObjectId,
          ref: 'Story'
        },

        commentBody: String,

        created: {
            type: Date,
            default: Date.now
        }
    });

    module.exports = mongoose.model('Comment', CommentSchema);
})();