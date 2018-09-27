var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var spySchema = new mongoose.Schema({
	userName: String,
	date: Date,
	message: String,
});

module.exports = mongoose.model('spy', spySchema);