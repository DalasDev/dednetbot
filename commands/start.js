const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect(process.env.MONGO_URL);
var User = require('./../schemas/user_model.js');

module.exports.run = async (bot, message, args) => {

	var event = message.guild.roles.find(`name`, "Ивент");

	//🕵секретный_чат / 🍲комната_отдыха

	if (!message.member.roles.some(r=>["Тех. Администратор", "Ивент"].includes(r.name)))
			return;
			
	let amount = 5000;

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
					foundObj.retrocoinBank = foundObj.retrocoinBank - amount;
					foundObj.retrocoinTotal = foundObj.retrocoinBank + foundObj.retrocoinCash;
					message.channel.send(`молодец! Ты учавствуешь!`);
				foundObj.save(function(err, updatedObj){
					if(err)
						console.log(err);
				});
			}
		}
	});

module.exports.help = {
	name: "start"
}
