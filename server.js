'use strict';



var express 				      = require('express'),
  mongoose                = require('mongoose'),
	server 					        = express(),
  bodyParser              = require('body-parser'),
  photoViewerController   = require('./server/controllers/photoViewerController'),
  chatController          = require('./server/controllers/chatController'),
  todos                   = require('./server/routes/todos'),
  chat                    = require('./server/routes/chat');

/*
var express                 = require('express');
var server                  = express();
var http                    = require('http').Server(server);
var io                      = require('socket.io')(http);
var bodyParser              = require('body-parser');
var mongoose                = require('mongoose');
var photoViewerController   = require('./server/controllers/photoViewerController');
var chatController          = require('./server/controllers/chatController');
var todos                   = require('./server/routes/todos');
var chat                    = require('./server/routes/chat');
*/

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.set('view engine', 'jade');

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
  res.render(__dirname + '/app/index.jade');
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

var io = require('socket.io').listen(server.listen(3000));
var userlist = {marklandsgatan: "userXY"};

io.sockets.on('connection', function (socket) {
  console.log('connection!');

  socket.emit('connected', userlist);

  socket.on('message', function(msg) {
    io.emit('newMessage', msg);
  });

  socket.on('userEntered', function(user) {
    userlist[socket] = user;
    io.emit('userlistUpdate', userlist);
    console.log(userlist);
  });

  socket.on('disconnect', function(msg) {
    console.log(msg);


    delete userlist[socket];

    console.log(userlist);
    io.emit('userlistUpdate', userlist);
  });
});



