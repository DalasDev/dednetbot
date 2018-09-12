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
	

	if (isNumeric(args[0]) && isNumeric(args[1])){
		var user_obj = User.findOne({
			userID: message.member.id 
		}, function (err, foundObj) {
			if (err)
				console.log("Error on database findOne: " + err);
			else {
				if (!foundObj)
					console.log("Something stange happend");
				else {
					if (Number(args[0]) >= 100 && Number(args[1]) >= 1 && Number(args[1]) <= 6){
						var actCash = foundObj.retrocoinCash;
						var toPlay = Number(args[0]);
						var winner = false;
						if (actCash - toPlay >= 0){
							var newCash = actCash - toPlay;
							var min = 1;
  							var max = 6;
  							var result = Math.floor(Math.random() * (max - min + 1)) + min;
  							if (result == Number(args[1])){
  								newCash = toPlay * 6 + actCash;
  								winner = true;
  								var won = toPlay * 6;
  							}
  							foundObj.retrocoinCash = newCash;
							foundObj.retrocoinTotal = newCash + foundObj.retrocoinBank;
							foundObj.save(function(err, updatedObj){
							if(err)
								console.log(err);
							});
							if (winner == true)
								return message.reply("закидываю 🎲 и вылетает... " + result + "! Ты только что выиграл " + won + "ⓟ! Поздравляю :bravo:");
							else
								return message.reply("закидываю 🎲 и вылетает... " + result + "! Ну ничего, в другой раз повезет больше :harold:");
  						}
  						else
  							return message.reply("видимо у тебя не достаточно ретриков на руках :harold:");
					}
					else if (Number(args[0]) < 100)
						return message.reply("минимальная ставка - 100 ретриков!");
					else if (Number(args[1]) < 1 || Number(args[1]) > 6)
						return message.reply("у куба всего 6 сторон, дядя :this_is_simple:");
				}
			}
		});
	}
	else
		return message.reply("Чеееее :wut:");
}

module.exports.help = {
	name: "dice"
}
