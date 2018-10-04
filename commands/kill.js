const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');

function isNumeric(value) {
	return /^\d+$/.test(value);
}

function kill(killed, message, bot){

	var killIcon = bot.emojis.find("name", "pepe_pistol");

	var user_obj = User.findOne({
		userID: killed.id
	}, function (err, foundObj) {
		if (err){
			console.log("Error on database findOne: " + err);
		}
		else {
			if (!foundObj)
				console.log("Something stange happend");
			else {
				foundObj.killed = foundObj.killed + 1;
				foundObj.save(function(err, updatedObj){
				if(err)
					console.log(err);
				});
				return message.channel.send(`${killIcon} ${killed}`);
			}
		}
	});
}

module.exports.run = async (bot, message, args) => {

	 if(!message.member.roles.some(r=>["Тех. Администратор", "Губернатор", "РетроТестер"].includes(r.name)))
	 	return;

	var killed = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

	if (!killed)
		return message.reply("пользователь не найден / не указан!");

	if (message.member == killed)
		return message.reply("ах ты суицидник! Сам себя ты не убьешь!");

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
					var dateTime = Date.now();
					var timestamp = Math.floor(dateTime/1000);
					var timestampLimit = Math.floor(foundObj.lastKill/1000) + 900;
					if (timestampLimit > timestamp)
						return message.reply("нельзя так часто убивать!");

					kill(killed, message, bot);

					foundObj.lastKill = dateTime;

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
	name: "kill"
}
