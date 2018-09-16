const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');

function isNumeric(value) {
	return /^\d+$/.test(value);
}

function rob(message, bot, toRob, robResult, robed){

	var retricIcon = bot.emojis.find("name", "retric");
	
	var user_obj = User.findOne({
		userID: message.member.id 
	}, function (err, foundObj) {
		if (err){
			console.log("Error on database findOne: " + err);
		}
		else {
			if (!foundObj)
				console.log("Something stange happend");
			else {
				var newCash = 0;
				if (robResult == true)
					newCash = foundObj.retrocoinCash + toRob;
				else {
					newCash = foundObj.retrocoinCash - toRob;
				}
				foundObj.retrocoinCash = newCash;
				foundObj.retrocoinTotal = foundObj.retrocoinBank + newCash;
				foundObj.save(function(err, updatedObj){
				if(err)
					console.log(err);
				});
				return message.reply(`вы че то там ${robed} ${toRob}${retricIcon}!`);
			}
		}
	});
}

module.exports.run = async (bot, message, args) => {

	var robed = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

	if (!robed)
		return message.reply("пользователь не найден / не указан!");
	
	var user_obj = User.findOne({
		userID: robed.id 
	}, function (err, foundObj) {
		if (err)
			console.log("Error on database findOne: " + err);
		else {
			if (!foundObj)
				console.log("Something stange happend");
			else {				
				var min = 1;
  				var max = 2;
  				var robResult = (Math.floor(Math.random() * (max - min + 1)) + min) == 1 ? true : false;
				var toRob = foundObj.retrocoinCash / 100 * 40;
				toRob = Math.round(toRob);
				if (robResult == true){
					foundObj.retrocoinCash = foundObj.retrocoinCash - toRob;
					foundObj.retrocoinTotal = foundObj.retrocoinBank + foundObj.retrocoinCash;
					rob(message, bot, toRob, robResult, robed);
				}
				else {
					console.log("Rob failed");
					rob(message, bot, toRob, robResult, robed);
				}
				foundObj.save(function(err, updatedObj){
				if(err)
					console.log(err);
				})
			}
		}
	});
}

module.exports.help = {
	name: "rob"
}