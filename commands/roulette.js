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

	var retricIcon = bot.emojis.find("name", "retric");
	var nopeIcon = bot.emojis.find("name", "nope");
	var bravoIcon = bot.emojis.find("name", "bravo");
	var pepeIcon = bot.emojis.find("name", "pepe_hmm");

	if (isNumeric(args[0]) && (args[1])) {
		var user_obj = User.findOne({
			userID: message.member.id 
		}, function (err, foundObj) {
			if (err)
				console.log("Error on database findOne: " + err);
			else {
				if (!foundObj)
					console.log("Something stange happend");
				else {
					// var dateTime = Date.now();
					// var timestamp = Math.floor(dateTime/1000);
					// var timestampLimit = Math.floor(foundObj.lastDice/1000) + 30;
					// if (timestampLimit > timestamp)
					// 	return message.reply("эээ, крути-верти, но не чаще, чем раз в пол минуты...");
					if (Number(args[0]) >= 100){
						var x = "";
						if (args[1] == "красное"){
							x = "red";
						}
						else if (args[1] == "черное"){
							x = "black";
						}
						else
							return message.reply("Пока что только черное или красное")

						var actCash = foundObj.retrocoinCash;
						var toPlay = Number(args[0]);
						var winner = "";
						if (actCash - toPlay >= 0){
							var newCash = actCash - toPlay;
							var min = 1;
  							var max = 36;
  							var r = Math.floor(Math.random() * (max - min + 1)) + min;
  							if (r == 1 || r == 3 || r == 5 || r == 7 || r == 9 || r == 12 || r == 14 ||
  							 r == 16 || r == 18 || r == 19 || r == 21 || r == 23 || r == 25 || r == 27 || r == 30 || r == 32 || r == 34 || r == 36)
  								winner = "red";
  							else
  								winner = "black";
  							if (x == winner){
  								var won = toPlay * 2;
  								newCash = actCash + won;
  							}
  							foundObj.retrocoinCash = newCash;
							foundObj.retrocoinTotal = newCash + foundObj.retrocoinBank;
							foundObj.lastRoulette = Date.now();
							foundObj.save(function(err, updatedObj){
							if(err)
								console.log(err);
							});
							message.channel.send("Новая игра в рулетку началась...");
							setTimeout(function(){ 
								if (winner == x)
									return message.reply(`вылетаело ${r} ${args[1]}!!! ${message.author}, ты только что выиграл ${won}ⓟ! Поздравляю ${bravoIcon}`);
								else
									return message.reply(`увы, но вылетаело ${r}! Видимо ${args[1]} - не твое ${pepeIcon}`);
						    }, 10000);
  						}
  						else
  							return message.reply("видимо у тебя не достаточно ретриков на руках :dark_sunglasses:");
					}
					else if (Number(args[0]) < 100)
						return message.reply("минимальная ставка - 100 ретриков!");
					// else if (Number(args[1]) < 1 || Number(args[1]) > 36)
					// 	return message.reply(`в рулетке можно ставить от 1 до 36, дядя ${nopeIcon}`);
				}
			}
		});
	}
	else if (!args[0])
		return message.reply("укажи ставку и твой прогноз!");
	else if (!args[1])
		return message.reply("на что ставить будем? От 1 до 6...");
}

module.exports.help = {
	name: "roulette"
}