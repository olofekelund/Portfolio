'use strict';

var express = require('express');
var router = express.Router();
var Todo = require('../models/Todo.js');


router.get('/', function(req, res, next) {
	Todo.find(function(err, todos) {
		if (err){ 
			return next(err);
		}
		res.json(todos);
	});
});

router.get('/:id', function(req, res, next) {
	Todo.findById(req.params.id, function (err, post) {
		if (err) {
			return next(err);
		}
		res.json(post);
	});
});

/* POST /todos */
router.post('/', function(req, res, next) {
  Todo.create(req.body, function (err, post) {
    if (err) {
     return next(err);
    }
    console.log(req.body);

    res.json(post);
  });
});

module.exports = router;