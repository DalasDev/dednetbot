var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var warnSchema = new mongoose.Schema({
	userID: String,
	userNickname: String,
	warnedFor: String,
	warnedBy: String,
	warnerNickname: String,
	when: Date,
	channelID: String,
	channelName: String,
	warnedVia: String
});

module.exports = mongoose.model('warns', warnSchema);
