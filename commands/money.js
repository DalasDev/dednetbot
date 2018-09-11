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
			var total = foundObj.retrocoinCash + foundObj.retrocoinBank;
			const embed = new Discord.RichEmbed()
			.setTitle("Личный счет")
			.setColor("#0000FF")
			.addField("Наличкой", foundObj.retrocoinCash + "ⓟ (ретриков)", true)
			.addField("В банке", foundObj.retrocoinBank + "ⓟ (ретриков)", true)
			.addField("Всего", total + "ⓟ (ретриков)", true)
//			.setImage("https://retrobotproject.herokuapp.com/images/bender.gif")

			message.channel.send({embed});
		}
	});
}


module.exports.help = {
	name: "money"
}
