const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');

module.exports.run = async (bot, message, args) => {
	
	if (args[1] = "all"){
		var user_obj = User.findOne({
			userID: message.member.id 
		}, function (err, foundObj) {
			if (err)
				console.log("Error on database findOne: " + err);
			else {
				if (!foundObj)
					console.log("Something stange happend");
				else {
					var actBank = foundObj.retrocoinBank;
					var actCash = foundObj.retrocoinCash;
					var newCash = actCash + actBank;
					actBank = 0;

					foundObj.retrocoinCash = newCash;
					foundObj.retrocoinBank = 0;
					foundObj.save(function(err, updatedObj){
						if(err)
							console.log(err);
					})

					var avatar = message.member.user.avatarURL;
					var total = foundObj.retrocoinCash + foundObj.retrocoinBank;
					const embed = new Discord.RichEmbed()
					.setTitle("Личный счет " + message.member.displayName)
					.setColor("#0000FF")
					.addField("Наличкой", foundObj.retrocoinCash + " ⓟ (ретриков)", true)
					.addField("В банке", foundObj.retrocoinBank + " ⓟ (ретриков)", true)
					.setThumbnail(avatar)

					message.channel.send({embed});
				}
			}
		});
	}
}


module.exports.help = {
	name: "with"
}