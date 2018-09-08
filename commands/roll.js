const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

	if(!message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR"))
		return message.channel.send("Похоже у тебя недостаточно на это прав, дружище :thinking:.");

	else{
		return message.channel.send(args);
	}
}

module.exports.help = {
	name: "roll"
}