const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');

function isNumeric(value) {
	return /^\d+$/.test(value);
}

function hit(hited, message, bot){

	var retricIcon = bot.emojis.find("name", "retric");

	var user_obj = User.findOne({
		userID: hited.id
	}, function (err, foundObj) {
		if (err){
			console.log("Error on database findOne: " + err);
		}
		else {
			if (!foundObj)
				console.log("Something stange happend");
			else {
				foundObj.hited = foundObj.hited + 1;
				foundObj.save(function(err, updatedObj){
				if(err)
					console.log(err);
				});
				return message.channel.send(`${hited} :left_facing_fist:`);
			}
		}
	});
}

module.exports.run = async (bot, message, args) => {

	if(!message.member.roles.some(r=>["Тех. Администратор", "Губернатор", "РетроТестер"].includes(r.name)))
		return;

	var hited = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

	if (!hited)
		return message.reply("пользователь не найден / не указан!");

	if (message.member == hited)
		return message.reply("ты не даун чтоб избивать самого себя!");


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
					var timestampLimit = Math.floor(foundObj.lastHit/1000) + 900;
					if (timestampLimit > timestamp)
						return message.reply("нельзя так часто драться!");

					hit(hited, message, bot);

					foundObj.lastHit = dateTime;

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
	name: "hit"
}
