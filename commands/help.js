const Discord = require("discord.js");

//help

module.exports.run = async (bot, message, args) => {

	let bicon = bot.user.avatarURL;
	const embed = new Discord.RichEmbed()
	.setTitle("Доступные на данный момент комманды")
	.setColor("#BF44FF")
	.setThumbnail(bicon)
	.addField("!addrole роль", "Добавляет роль, доступна админу", true)
	.addField("!ban", "Тут и ежу ясно", true)
	.addField("!botinfo", "Информация о боте (можем написать что захотим)", true)
	.addField("!kick", "И тут все понятно", true)
	.addField("!removerole роль", "Удаляет роль, доступна админу", true)
	.addField("!report user причина", "Отправляет жалобу в скрытый канал", true)
	.addField("!serverinfo", "Информация о сервере, можем показывать что захотим но солгать в цифрах не сможем", true)
	.addField("!tempmute user Xs/m/h/d", "Мут на X времени", true)
	.addField("!unmute", "Тут все логично...", true)
	.addField("!voicemute user Xs/m/h/d", "Мут микрофона на X времени", true)
	.addField("!voiceunmute", "Анмут микрофона преждевременно", true)
	.addField("!warn user reason", "Варны, сами опробуете, накопительная система", true)
	.addField("Продолжение следует...", ":dab:", true)

	message.channel.send({embed});
}


module.exports.help = {
	name: "help"
}