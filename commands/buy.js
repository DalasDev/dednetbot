const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');
var Item = require('./../schemas/shop_model.js');

function isNumeric(value) {
	return /^\d+$/.test(value);
}

module.exports.run = async (bot, message, args) => {

	message.delete().catch(O_o=>{});

	// User.findOne({userID: message.member.id}).lean().exec(function(err, user) {
	// 	console.log("USER : " + user);
	// });
	var user = await User.findOne({userID: message.member.id}, function(err, found_user){});

	console.log("User is : " + user);
}

module.exports.help = {
	name: "buy"
}
