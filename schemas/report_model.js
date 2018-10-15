var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reportSchema = new mongoose.Schema({
	moder: String,
  moderID: String,
	warnsAmount: Number,
	infsractionsAmount: Number,
});

module.exports = mongoose.model('report', reportSchema);
