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

  var user_obj = User.findOne({
    userID: message.member.id
  }, function (err, foundObj) {
		foundObj.retrocoinBank = foundObj.retrocoinBank - 5000;
		foundObj.retrocoinTotal = foundObj.retrocoinBank +  foundObj.retrocoinCash;
})
		message.reply("молодец!");
}

module.exports.help = {
	name: "start"
}
