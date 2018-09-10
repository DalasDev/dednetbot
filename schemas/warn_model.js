var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var warnSchema = new mongoose.Schema({
	userID: String,
	warnedFor: String,
	warnedBy: String,
	when: Date,
	channel: String,
	warnedVia: String
});

module.exports = mongoose.model('warns', warnSchema);