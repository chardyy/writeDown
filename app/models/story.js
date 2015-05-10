var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorySchema = new Schema({

	creator: {
		type: Schema.Types.ObjectId, 
		ref: 'User'
	},

	content: String,
	created: {
		type: Date,
		default: Date.now
	}

}); //instance of schema object.

//export the schema story.
	
	module.exports = mongoose.model('Story', StorySchema);