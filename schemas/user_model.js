var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	userID: String,
	displayName: String,
	highestRole: String,
	joinedAt: Date,
	messages: Number,
	infractions: Number,
	retrocoins: Number,
});

module.exports = mongoose.model('users', userSchema);