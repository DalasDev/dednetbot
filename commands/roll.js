const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

//лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return;

	if(!message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR"))
		return message.channel.send("Похоже у тебя недостаточно на это прав, дружище :thinking:.");

	let diap = args;

	if (!diap){
		console.log("DB1");
		return message.channel.send("Прокрутить от 1 до 6");
	}

	else if (!args[1]){
		console.log("DB2");
		return message.channel.send(args);
	}
	else {
		console.log("DB3");
		return message.channel.send("Найдено больше одного аргумента");
	}
}

module.exports.help = {
	name: "roll"
}
