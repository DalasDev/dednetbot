const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

	if(!message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR"))
		return message.channel.send("Похоже у тебя недостаточно на это прав, дружище :thinking:.");

	let diap = args;

	if (!diap){
		return message.channel.send("Укажите диапазон, к примеру 1-12");
	}

	else if(!args[1]){
		return message.channel.send(args);
	}
	else{
		return message.channel.send("Найдено больше одного аргумента");
	}
}

module.exports.help = {
	name: "roll"
}