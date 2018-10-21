const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');
var Item = require('./../schemas/shop_model.js');

function isNumeric(value) {
	return /^\d+$/.test(value);
}

function random(min, max) {
	var result = Math.floor(Math.random() * (max - min + 1)) + min;
	return (result);
}

function playcf(user, toPlay, message){

	var user_obj = User.findOne({userID: message.member.id}, function(err, found_user){
		if (err)
			console.log("WTF there is an error: " + err);
		else {
			if (!user_obj)
				console.log("User not found");
			else {
				message.reply("играем!");
				
//				if (user_obj.)
				//запускаю игру, потом сохраняю и отвечаю в чат
				found_user.save(function(err, updatedObj){
				if (err)
					console.log(err);
				});
			}
		}
	});
	return message.reply("держи, вот тебе " + item.itemName);
}

module.exports.run = async (bot, message, args) => {

	//message.delete().catch(O_o=>{});

	var user_obj = await User.findOne({userID: message.member.id}, function(err, found_user){});

	if (typeof user_obj === 'undefined' || user_obj === null)
		return message.reply("пользователь не найден в базе");

	//чекаем есть ли у него Курочка в инвентаре

	if (user_obj.inv.includes("Курочка 🐔") == false)
		return message.reply("у тебя нету 🐔");

	//чекаем сделал ли типуля ставку и достаточно ли у него денег в базе

	if (args[0] && isNumeric(args[0]) == true){

		let toPlay = Number(args[0]);
		if (toPlay >= 100){
			if ((user_obj.retrocoinCash - toPlay) >= 0){
				playcf(user_obj, toPlay, message);
			}
			else{
				return message.reply("у тебя не хватит на это ретриков!");
			}
		}
		else{
			return message.reply("минимальная стака - 100 ретриков!");
		}
	}
	return message.reply("нужно сделать ставку, от 100 ретриков и выше!")
}

module.exports.help = {
	name: "cf"
}