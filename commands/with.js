const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');

function isNumeric(value) {
	return /^\d+$/.test(value);
}

module.exports.run = async (bot, message, args) => {

	if (args[0] === "all"){
		var user_obj = User.findOne({
			userID: message.member.id 
		}, function (err, foundObj) {
			if (err)
				console.log("Error on database findOne: " + err);
			else {
				if (!foundObj)
					console.log("Something stange happend");
				else {
					var actBank = foundObj.retrocoinBank;
					var actCash = foundObj.retrocoinCash;
					var newCash = actCash + actBank;

					foundObj.retrocoinCash = newCash;
					foundObj.retrocoinBank = 0;
					foundObj.retrocoinTotal = newCash;
					foundObj.save(function(err, updatedObj){
						if(err)
							console.log(err);
					})

					var avatar = message.member.user.avatarURL;
					var total = foundObj.retrocoinCash + foundObj.retrocoinBank;

					const embed = new Discord.RichEmbed()
					.setTitle("Все ⓟ (ретрики) сняты с банковского счета! Новый баланс " + message.member.displayName)
					.setColor("#0000FF")
					.addField("Наличкой", foundObj.retrocoinCash + " ⓟ (ретриков)", true)
					.addField("В банке", foundObj.retrocoinBank + " ⓟ (ретриков)", true)

					message.channel.send({embed});
				}
			}
		});
	}
	else if (isNumeric(args[0])){
		var user_obj = User.findOne({
			userID: message.member.id 
		}, function (err, foundObj) {
			if (err)
				console.log("Error on database findOne: " + err);
			else {
				if (!foundObj)
					console.log("Something stange happend");
				else {
					var actBank = foundObj.retrocoinBank;
					var actCash = foundObj.retrocoinCash;
					var toWith = Number(args[0]);
					var newBank = actBank - toWith;
					var newCash = actCash + toWith;
					if (newBank >= 0){
						foundObj.retrocoinCash = newCash;
						foundObj.retrocoinBank = newBank;
						foundObj.retrocoinTotal = newBank + newCash;
						foundObj.save(function(err, updatedObj){
							if(err)
								console.log(err);
						})
						var avatar = message.member.user.avatarURL;
						var total = foundObj.retrocoinCash + foundObj.retrocoinBank;
						const embed = new Discord.RichEmbed()
						.setTitle(toWith + " ретриков снято со счета! Новый баланс " + message.member.displayName)
						.setColor("#0000FF")
						.addField("Наличкой", foundObj.retrocoinCash + " ⓟ (ретриков)", true)
						.addField("В банке", foundObj.retrocoinBank + " ⓟ (ретриков)", true)

						message.channel.send({embed});
					}
					else {
						return message.channel.send("У тебя разве хватает ⓟ (ретриков) на такое действие? :thinking:");
					}
				}
			}
		});
	}
	else
		return message.reply("чеееее :thinking:");
}

module.exports.help = {
	name: "with"
}