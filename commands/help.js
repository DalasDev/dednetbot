const Discord = require("discord.js");

//help

module.exports.run = async (bot, message, args) => {

	//лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
	// if(!message.member.hasPermission("MANAGE_MESSAGES"))
	// 	return;

	message.delete().catch(O_o=>{});

	let bicon = bot.user.avatarURL;
	const embed = new Discord.RichEmbed()
	.setTitle("Доступные на данный момент комманды")
	.setColor("#BF44FF")
	.setThumbnail(bicon)
	.addField("^botinfo", "Информация о боте", true)
	.addField("^serverinfo", "Информация о сервере", true)
	.addField("^report (@user) (Причина)", "Отправляет жалобу в скрытый канал", true)
	.addField("^roll (MIX-MAX)", "Кинуть 🎲 между X и Y", true)
	.addField("^money", "Показать количество ретриков", true)
	.addField("^with X/all", "Показать количество ретриков", true)
	.addField("^dep X/all", "Показать количество ретриков", true)
	.addField("^dice 100+ 1-6", "Игра в кости, ставки от 100 ретриков", true)
	.setFooter("Продолжение следует...", "")
	.setImage("https://retrobotproject.herokuapp.com/images/bender.gif")

	message.channel.send({embed});
}

module.exports.help = {
	name: "help"
}
