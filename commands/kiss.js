const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');

function isNumeric(value) {
	return /^\d+$/.test(value);
}

function kiss(kissed, message, bot){

	console.log("DB4");

	var retricIcon = bot.emojis.find("name", "retric");
	
	var user_obj = User.findOne({
		userID: kissed.id 
	}, function (err, foundObj) {
		if (err){
			console.log("Error on database findOne: " + err);
		}
		else {
			if (!foundObj)
				console.log("Something stange happend");
			else {
				console.log("DB5");
				foundObj.kissed = foundObj.kissed + 1;
				foundObj.save(function(err, updatedObj){
				if(err)
					console.log(err);
				});
				return message.channel.send(`${kissed} :kissing_heart:`);
			}
		}
	});
}

module.exports.run = async (bot, message, args) => {

	console.log("DB1");

	if(!message.member.hasPermission("MANAGE_ROLES"))
    	return;

	var kissed = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

	if (!kissed)
		return message.reply("пользователь не найден / не указан!");

	if (!args[1]) {
		var user_obj = User.findOne({
			userID: message.member.id 
		}, function (err, foundObj) {
			if (err)
				console.log("Error on database findOne: " + err);
			else {
				if (!foundObj){
					console.log("User not found in database");
					return;
				}
				else {
					console.log("DB2");
					var dateTime = Date.now();
					var timestamp = Math.floor(dateTime/1000);
					var timestampLimit = Math.floor(foundObj.lastKiss/1000) + 900;
					if (timestampLimit > timestamp)
						return message.reply("нельзя так часто целоваться!");
					
					console.log("DB3");
					kiss(kissed, message, bot);
					
					foundObj.lastKiss = dateTime;

					foundObj.save(function(err, updatedObj){
					if(err)
						console.log(err);
					})
				}
			}
		});
	}
	else
		return message.reply("чеееее :thinking:");
}

module.exports.help = {
	name: "pay"
}