const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');

module.exports.run = async (bot, message, args) => {

	let toScan = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

	if(!toScan){
		var user_obj = User.findOne({
			userID: message.member.id
		}, function (err, foundObj) {
			if (err)
				console.log("Error on database findOne: " + err);
			else {
				var avatar = message.member.user.avatarURL;
				var total = foundObj.retrocoinCash + foundObj.retrocoinBank;
				const embed = new Discord.RichEmbed()
				.setTitle("Личный счет " + message.member.displayName)
				.setColor("#0000FF")
				.addField("Наличкой", foundObj.retrocoinCash + "  :retric:  (ретриков)", true)
				.addField("В банке", foundObj.retrocoinBank + "  :retric:  (ретриков)", true)
				.setThumbnail(avatar)

				message.channel.send({embed});
			}
		});
	} else {
		var user_obj = User.findOne({
			userID: toScan.id
		}, function (err, foundObj) {
			if (err)
				console.log("Error on database findOne: " + err);
			else {
				var avatar = toScan.user.avatarURL;
				var total = foundObj.retrocoinCash + foundObj.retrocoinBank;
				const embed = new Discord.RichEmbed()
				.setTitle("Личный счет " + toScan.displayName)
				.setColor("#0000FF")
				.addField("Наличкой", foundObj.retrocoinCash + "  :retric:  (ретриков)", true)
				.addField("В банке", foundObj.retrocoinBank + "  :retric:  (ретриков)", true)
				.setThumbnail(avatar)

				message.channel.send({embed});
			}
		});
	}
}


module.exports.help = {
	name: "money"
}
