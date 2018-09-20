var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	userID: String,
	displayName: String,
	highestRole: String,
	status: String,
	joinedAt: Date,
	messages: Number,
	infractions: Number,
	retrocoinCash: Number,
	retrocoinBank: Number,
	retrocoinTotal: Number,
	lastDice: Date,
	lastScan: Date,
	lastWork: Date,
	lastRoulette: Date,
	lastRob: Date,
	kissed: Number,
	lastKiss: Date,
	huged: Number,
	lastHug: Date,
	fcked: Number,
	lastFck: Date,
	hit: Number,
	lastHit: Date,
	killed: Number,
	lastKill: Date,
	drunk: Number,
	lastDrunk: Date,
});

module.exports = mongoose.model('users', userSchema);