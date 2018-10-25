var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var warnSchema = new mongoose.Schema({
	vmutedID: String,
	userNickname: String,
	vmutedFor: String,
	vmutedBy: String,
	vmuterNickname: String,
	when: Date,
	channelID: String,
	channelName: String,
});

module.exports = mongoose.model('voicemute', warnSchema);
