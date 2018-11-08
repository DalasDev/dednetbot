const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect(process.env.MONGO_URL);
var User = require('./../schemas/user_model.js');

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports.run = async (bot, message, args) => {

	var retricIcon = bot.emojis.find("name", "retric");


	if(toScan && toScan.roles.some(r=>["Бездушные"].includes(r.name)))
		return;

	var user_obj = User.findOne({
		userID: "358212316975726603"
	}, function (err, foundObj) {
		if (err)
			console.log("Error on database findOne: " + err);
		else {
			if (!foundObj){
				console.log("User not found in database");
				return;
			}
			const embed = new Discord.RichEmbed()
			.setTitle("Фонд эвента")
			.setColor("#0000FF")
			.addField("Составляет", `${numberWithCommas(foundObj.eventFond)} ${retricIcon}`, true)

			message.channel.send({embed});
		}
	});
}


module.exports.help = {
	name: "fond"
}
