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

	// User.findOne({userID: message.member.id}).lean().exec(function(err, user) {
	// 	console.log("USER : " + user);
	// });
	var test = User.findOne({userID: message.member.id}, function(err, found_user){
		console.log("User total money is: " + found_user.retrocoinTotal);
	});
	console.log("test[0] is : " + test[0]);
	return message.reply(`${test}`);
}

module.exports.help = {
	name: "buy"
}
