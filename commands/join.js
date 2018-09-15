const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

	//лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
	if(!message.member.hasPermission("MANAGE_ROLES"))
		return;
	
	const voiceChannel = msg.member.voiceChannel;
			
	if (!voiceChannel || voiceChannel.type !== 'voice')
		return msg.reply('I couldn\'t connect to your voice channel...');
	voiceChannel.join().then(connection => console.log('Connected')).catch(console.log(err));
}

module.exports.help = {
	name: "join"
}
