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

	console.log("1 " + message);
	console.log("2 " + message.channel);

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

				var answers = [];
				answers.push("1");
				answers.push("2");
				answers.push("3");
				answers.push("4");
				answers.push("5");
				answers.push("6");
				answers.push("7");
				answers.push("8");
				answers.push("9");
				answers.push("10");
				answers.push("11");
				answers.push("12");
				answers.push("13");
				answers.push("14");
				answers.push("15");
				answers.push("16");
				answers.push("17");
				answers.push("18");
				answers.push("19");
				answers.push("20");
				let index = Math.floor((Math.random() * answers.length));
				let answer = answers[index];

				message.reply("Answer number " + answer + ", won " + toPay + " retro coins!");

				foundObj.save(function(err, updatedObj){
				if(err)
					console.log(err);
				});
			}
		}
	});
}

module.exports.help = {
	name: "work"
}