
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');

var app = express();

//socket.io
var http = require('http').Server(app);
var io = require('socket.io')(http);

//connection string
mongoose.connect(config.database, function(err){
	if(err){
		console.log(err);
	}else{
		console.log('Connected to database');
	}
});

//load the necessary request-middleware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

//angular middleware.
app.use(express.static(__dirname + '/public'));

//to load the api.
var api = require('./app/routes/api')(app, express, io);
app.use('/api', api);



//for the views.
app.get('*', function(req, res){
    res.sendFile(__dirname + '/public/app/views/index.html');
});


//listen to  the port.
http.listen(config.port, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Listening on port 3000");
    }
});