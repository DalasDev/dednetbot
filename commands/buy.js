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

	var user_obj = User.findOneAndUpdate({userID: message.member.id}).lean().exec(function(err, user) {
		console.log("USER : " + user);
	});
	console.log("USER OBJ : " + user_obj);
	return message.reply(`${user_obj}`);
}

module.exports.help = {
	name: "buy"
}
