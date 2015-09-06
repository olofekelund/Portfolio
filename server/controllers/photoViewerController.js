'use strict';

var fs = require('fs');
var files = fs.readdirSync(__dirname + '/../../public/img/').filter(function(f) {
	return f.search("\\..") > 0;
});

var json = {
	'files':files
};

module.exports.list = json;