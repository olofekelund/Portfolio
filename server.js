'use strict';

var express 				      = require('express'),
  mongoose                = require('mongoose'),
	server 					        = express(),
  bodyParser              = require('body-parser'),
	photoViewerController 	= require('./server/controllers/photoViewerController'),
  chatController          = require('./server/controllers/chatController'),
  todos                   = require('./server/routes/todos'),
  chat                    = require('./server/routes/chat');


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/mongo', function (err) {
  if (err) {
    console.log('connection error, ', err);
  } else {
    console.log('Connection succesful.');
  }
});

server.use('/todos', todos);
server.use('/chat', chat);
server.use(express.static(__dirname + '/public'));
server.use('/bower_components', express.static(__dirname + '/bower_components'));
server.use('/views', express.static(__dirname + '/app/views/'));
server.use('/img', express.static(__dirname + '/public/img/'));
server.use('/bg', express.static(__dirname + '/public/img/bg/'));
server.use('/css', express.static(__dirname + '/public/css/'));
server.use('/', express.static(__dirname + '/app/'));

server.get('/', function (req, res) {
  res.sendFile(__dirname + '/app/index.html');
});

server.get('/users', function(req, res) {
  mongoose.model('users').find(function(err, users) {
    res.send(users);
  });
});

server.get('/api/photoView', function (req, res) {
  var files = photoViewerController.list;
  res.json(files);
});

server.get('/api/chat', function (req, res) {
  var messages = chatController.messages;
  res.json(messages);
});

server.use(function(req, res){
  res.status(404);

  // default to plain-text. send()
  res.type('txt').send('Not found.');
});

server.listen(3000, function() {
	console.log('Listening on port 3000...');
});
