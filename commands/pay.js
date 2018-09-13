const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');

function isNumeric(value) {
	return /^\d+$/.test(value);
}

function send_money(payed_id, toPay){
	console.log("DB6");
	var user_obj = User.findOne({
		userID: payed_id 
	}, function (err, foundObj) {
		if (err){
			console.log("Error on database findOne: " + err);
		}
		else {
			console.log("DB7");
			if (!foundObj)
				console.log("Something stange happend");
			else {
				console.log("DB8");
				let newCash = foundObj.retrocoinCash + toPay;
				foundObj.retrocoinCash = newCash;
				foundObj.retrocoinTotal = foundObj.retrocoinBank + newCash;
				foundObj.save(function(err, updatedObj){
				if(err)
					console.log(err);
				});
				return message.reply("Вы отдали " + toPay + " ретриков!");
			}
		}
	});
}

module.exports.run = async (bot, message, args) => {

	var payed = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

	if (!payed)
		return message.reply("пользователь не найден / не указан!");

	console.log("DB1");

	if (isNumeric(args[1]) && !args[2] && Number(args[1]) >= 1) {
		console.log("DB2");
		var user_obj = User.findOne({
			userID: message.member.id 
		}, function (err, foundObj) {
			if (err)
				console.log("Error on database findOne: " + err);
			else {
				console.log("DB3");
				if (!foundObj)
					console.log("Something stange happend");
				else {
					console.log("DB4");
					var actCash = foundObj.retrocoinCash;
					var toPay = Number(args[1]);
					var newCash = actCash - toPay;
					if (newCash < 0)
						return message.reply("у тебя нехватка нала для такой операции!");
					console.log("DB5");
					send_money(payed.id, toPay);
					console.log("DB9");
					foundObj.retrocoinCash = newCash;
					foundObj.retrocoinTotal = foundObj.retrocoinBank + newCash;

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