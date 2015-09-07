
var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
	username: String,
	message: String,
	submitted_at: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Chat', ChatSchema);