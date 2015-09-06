'use strict';

var express 				= require('express'),
	server 					= express(),
	photoViewerController 	= require('./server/controllers/photoViewerController');

server.get('/', function (req, res) {
	res.sendFile(__dirname + '/app/index.html');
});

server.use(express.static(__dirname + '/public'));
server.use('/bower_components', express.static(__dirname + '/bower_components'));
server.use('/views', express.static(__dirname + '/app/views/'));
server.use('/img', express.static(__dirname + '/public/img/'));
server.use('/bg', express.static(__dirname + '/public/img/bg/'));
server.use('/css', express.static(__dirname + '/public/css/'));
server.use('/', express.static(__dirname + '/app/'));

server.get('/api/photoView', function (req, res) {
	var files = photoViewerController.list;
	res.json(files);
});


server.use(function(req, res){
  res.status(404);
/*
  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
*/
  // default to plain-text. send()
  res.type('txt').send('Not found');
});

server.listen(3000, function() {
	console.log('Listening on port 9000...');
});
