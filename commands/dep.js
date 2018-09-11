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
	
	if (args[1] === "all"){
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
					var newBank = actCash + actBank;

					foundObj.retrocoinCash = 0;
					foundObj.retrocoinBank = newBank;
					foundObj.save(function(err, updatedObj){
						if(err)
							console.log(err);
					})

					var avatar = message.member.user.avatarURL;
					var total = foundObj.retrocoinCash + foundObj.retrocoinBank;
					const embed = new Discord.RichEmbed()
					.setTitle("Личный счет " + message.member.displayName)
					.setColor("#0000FF")
					.addField("Наличкой", foundObj.retrocoinCash + " ⓟ (ретриков)", true)
					.addField("В банке", foundObj.retrocoinBank + " ⓟ (ретриков)", true)
					.setThumbnail(avatar)

					message.channel.send({embed});
				}
			}
		});
	}
	else if (isNumeric(args[1])){
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
					var toDep = Number(args[1]);
					var newBank = actBank + toDep;
					var newCash = actCash - toDep;
					if (newCash >= 0){
						foundObj.retrocoinCash = newCash;
						foundObj.retrocoinBank = newBank;
						foundObj.save(function(err, updatedObj){
							if(err)
								console.log(err);
						})
						var avatar = message.member.user.avatarURL;
						var total = foundObj.retrocoinCash + foundObj.retrocoinBank;
						const embed = new Discord.RichEmbed()
						.setTitle("Личный счет " + message.member.displayName)
						.setColor("#0000FF")
						.addField("Наличкой", foundObj.retrocoinCash + " ⓟ (ретриков)", true)
						.addField("В банке", foundObj.retrocoinBank + " ⓟ (ретриков)", true)
						.setThumbnail(avatar)
						
						message.channel.send({embed});
					}
					else {
						return message.channel.send("У тебя разве хватает ретриков на такое действие? :thinking:");
					}
				}
			}
		});
	}
}

module.exports.help = {
	name: "dep"
}