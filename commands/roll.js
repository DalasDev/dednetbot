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
		var separator = "-";
		var arrayOfNumbers = args[0].split(separator);
		if (arrayOfNumbers[1] > arrayOfNumbers[0]){
			var result = Math.floor(Math.random() * (arrayOfNumbers[1] - arrayOfNumbers[0] + 1)) + arrayOfNumbers[0];
			return message.channel.send(result);
		}
		else if (arrayOfNumbers[1] = arrayOfNumbers[0]){
			return message.channel.send("Эту уже не рандом :this_is_simple:");
		}
		return message.channel.send("Я чего-то не допонял :facepalm: Ты цифры местами не попутал?");
	}
	else {
		return message.channel.send("Я чего-то не допонял :thinking:");
	}
}

module.exports.help = {
	name: "roll"
}