const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

//лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return;

	if(!message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR"))
		return message.channel.send("Похоже у тебя недостаточно на это прав, дружище :thinking:.");

	if (!args[0]){
		var min = 1;
		var max = 6;
		var result = Math.floor(Math.random() * (max - min + 1)) + min;
		return message.channel.send(result);
	}

	else if (!args[1]){
		return message.channel.send(args);
	}
	else {
		return message.channel.send("Я чего-то не допонял :thinking:");
	}
}

module.exports.help = {
	name: "roll"
}
