'use strict';

var express 		= require('express');
var router 			= express.Router();
var Chat 			= require('../models/Chat.js');
var chatController 	= require('../controllers/chatController');

router.get('/api/chat', function (req, res) {
  var messages = chatController.messages;
  res.json(messages);
});

router.get('/', function(req, res, next) {
	Chat.find(function(err, todos) {
		if (err){ 
			return next(err);
		}
		res.json(todos);
	});
});

router.get('/:id', function(req, res, next) {
	Chat.findById(req.params.id, function (err, post) {
		if (err) {
			return next(err);
		}
		res.json(post);
	});
});

router.post('/', function(req, res, next) {
  Chat.create(req.body, function (err, post) {
    if (err) {
     return next(err);
    }
    console.log(req.body);

    res.json(post);
  });
});

module.exports = router;