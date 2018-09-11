const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');

module.exports.run = async (bot, message, args) => {
	var user_obj = User.findOne({
		userID: message.member.id 
	}, function (err, foundObj) {
		if (err)
			console.log("Error on database findOne: " + err);
		else {
			return message.reply("у тебя на счету " + foundObj.retrocoins + " ⓟ (ретриков)");
		}
	});
}


module.exports.help = {
	name: "money"
}
