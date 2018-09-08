const Discord = require("discord.js");

//help

module.exports.run = async (bot, message, args) => {

	//лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
	if(!message.member.hasPermission("MANAGE_MESSAGES"))
		return;

	message.delete().catch(O_o=>{});

	let bicon = bot.user.avatarURL;
	const embed = new Discord.RichEmbed()
	.setTitle("Доступные на данный момент комманды")
	.setColor("#BF44FF")
	.setThumbnail(bicon)
	.addField("^addrole роль", "Добавляет роль, доступна админу", true)
	.addField("^ban", "Тут и ежу ясно", true)
	.addField("^botinfo", "Информация о боте", true)
	.addField("^kick", "И тут все понятно", true)
	.addField("^removerole роль", "Удаляет роль, доступна админу", true)
	.addField("^report user причина", "Отправляет жалобу в скрытый канал", true)
	.addField("^serverinfo", "Информация о сервере", true)
	.addField("^tempmute user Xs/m/h/d", "Мут на X времени", true)
	.addField("^unmute", "Тут все логично...", true)
	.addField("^voicemute user Xs/m/h/d", "Мут микрофона на X времени", true)
	.addField("^voiceunmute", "Анмут микрофона преждевременно", true)
	.addField("^warn user reason", "Варны, накопительная система", true)
	.addField("^unban", "Попробуйте сами угадать", true)
	.addField("^clear X", "Удалить последние Х сообщений с чата (от 2 до 100)", true)
	.addField("^roll X-Y", "Кинуть 🎲 между X и Y", true)
	.setFooter("Продолжение следует...", "")
	.setImage("https://retrobotproject.herokuapp.com/images/bender.gif")

	message.channel.send({embed});
}

module.exports.help = {
	name: "help"
}
