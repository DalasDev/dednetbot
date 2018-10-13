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

	var user = await User.findOne({userID: message.member.id}, function(err, found_user){});
	if (typeof user === 'undefined' || user === null)
		return message.reply("Пользеватель не найден в базе");
	console.log(user.displayName + " пытается что-то купить");
}

module.exports.help = {
	name: "buy"
}
