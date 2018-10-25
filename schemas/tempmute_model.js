var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var warnSchema = new mongoose.Schema({
	tmutedID: String,
	userNickname: String,
	tmutedFor: String,
	tmutedBy: String,
	tmuterNickname: String,
	when: Date,
	channelID: String,
	channelName: String,
});

module.exports = mongoose.model('warns', warnSchema);
