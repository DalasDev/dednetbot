const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

	if(!message.member.hasPermission("MANAGE_ROLES"))
		return;
	
	const voiceChannel = message.member.voiceChannel;
			
	if (!voiceChannel || voiceChannel.type !== 'voice')
		return message.reply("Что-то пошло не так, не могу прыгнуть в твой канал...");
	voiceChannel.join();
}

module.exports.help = {
	name: "join"
}
