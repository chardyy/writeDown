(function(){

	'use strict';

	var User = require('../models/user');
	var Story = require('../models/story');
	var config = require('../../config');

	//use instance
	var secretKey = config.secretKey;

	//json webtoken
	var jsonwebtoken = require('jsonwebtoken');

	//function to createToken.

	function createToken(user){
		
		var token = jsonwebtoken.sign({
			id: user._id,
			name: user.name,
			username: user.username
		}, secretKey, {
			expiresInMinute: 1440
		});

		return token;
	}

	//first api creation

	module.exports = function(app, express, io){

		var api = express.Router();
		api.get('/all_stories', function(req, res){

			Story.find({}, function(err, stories){
				if(err){
					res.send(err);
					return;
				}

				res.json(stories);
			});
		});

		//instance
		api.post('/signup', function(req, res){

			//create instance of user object...
			var user = 	new User({
				name: req.body.name,
				username: req.body.username,
				password: req.body.password
			});

			var token = createToken(user);

			//save to database
			user.save(function(err){
				if(err){
					res.send(err);
					return;
				}

				//return as a json-response for the api.
				res.json({ 
					success: true,
					message: 'Success, user has been created',
					token: token
				});

			});

		});
		//end of api-post request


		//api get-request
		api.get('/users', function(req, res){

			User.find({}, function(err, users){
				if(err){
					res.send(err);
					return;
				}

				res.json(users);
			});
		});
		//end of api-get request


		//another api object.
		api.post('/login', function(req, res){

			//finding specific user object
			User.findOne({
				username: req.body.username

			}).select('name username password').exec(function(err, user){
				
				if(err) throw err;

				if(!user){
					res.send({ message: "User doesnt exist"});
				}else if(user){
					var validPassword = user.comparePassword(req.body.password);

					if(!validPassword){
						res.send({ message: "Password is invalid" });
					}else{

						//create token

						var token = createToken(user);

						res.json({
							success: true,
							message: "Success!",
							token: token
						});
					}
				}
			});

		}); 
		//end of api-post request


		//creating a custom middleware.
			api.use(function(req, res, next){
				console.log("Using the app.");

				//fetch the token.
					var token = req.body.token || req.param('token') || req.headers['x-access-token'];

					//check if token is true.
						if(token){
							jsonwebtoken.verify(token, secretKey, function(err, decoded){

								if(err){
									res.status(403).send({ success:false, message: "Token dont match" });
								}else{
									
									//go to the next route
									req.decoded = decoded;
									next();
								}
							});
						}else{
							res.status(403).send({ success:false, message: "Token Mismatch" });
						}
					//end of checking token.
			});

		//end of custom middleware


		//Destination of the api request.

		api.route('/')
		   .post(function(req, res){

		   		var story = new Story({
		   			creator: req.decoded.id,
		   			content: req.body.content
		   		});

		   		//save to database.
		   		story.save(function(err, newStory){

		   			if(err){
		   				res.send(err);
		   				return;
		   			}

		   			io.emit('story', newStory);
		   			res.json({
		   				message: "New Story Created"
		   			});
		   		});
		   })
		   .get(function(req, res){

		   		Story.find({ creator: req.decoded.id }, function(err, stories){
		   			
		   			if(err){
		   				res.send(err);
		   				return;
		   			}

		   			res.json(stories);
		   		});
		   });
		//chain of the api-request

		//last api to communicate with angular.

			api.get('/me', function(req, res){
				res.json(req.decoded);
			});
		//
		
		return api; 	//return the api for the front-end.

	}; //end of module exports
	
})();