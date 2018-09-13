const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');


function isNumeric(value) {
	return /^\d+$/.test(value);
}

function random(min, max) {
	var result = Math.floor(Math.random() * (max - min + 1)) + min;
	return (result);
}

module.exports.run = async (bot, message, args) => {

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

				let toPay = random(45, 300);
				let newCash = foundObj.retrocoinCash + toPay;
				foundObj.retrocoinCash = newCash;
				foundObj.retrocoinTotal = foundObj.retrocoinBank + newCash;

				var answer = [];
				answer.push("1");
				answer.push("2");
				answer.push("3");
				answer.push("4");
				answer.push("5");
				answer.push("6");
				answer.push("7");
				answer.push("8");
				answer.push("9");
				answer.push("10");
				answer.push("11");
				answer.push("12");
				answer.push("13");
				answer.push("14");
				answer.push("15");
				answer.push("16");
				answer.push("17");
				answer.push("18");
				answer.push("19");
				answer.push("20");
				let index = Math.floor((Math.random() * answer.length));
				let message = answer[index];

				foundObj.save(function(err, updatedObj){
				if(err)
					console.log(err);
				});
				return message.reply("Answer number " + message + ", won " + toPay + " retro coins!");
//				return message.reply(`вы заработали ${toPay} ретриков!`);
			}
		}
	});
}

module.exports.help = {
	name: "work"
}