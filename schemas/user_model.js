var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	userID: String,
	displayName: String,
	highestRole: String,
	joinedAt: Date,
	messages: Number,
	infractions: Number,
	retrocoinCash: Number,
	retrocoinBank: Number,
	retrocoinTotal: Number,
	lastScan: Date,
});

module.exports = mongoose.model('users', userSchema);