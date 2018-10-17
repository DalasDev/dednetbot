const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

//  	message.delete().catch(O_o=>{});

	let bicon = bot.user.avatarURL;

	let inembed = new Discord.RichEmbed()

	.setDescription(":sparkling_heart:Приглашение на сервер:sparkling_heart:")
	.setColor("#b600ff")
	.setThumbnail(bicon)
	.addField("https://discord.gg/Ft58PYH", "fire", true)
	.setFooter("Приглашай своих друганов)", "")

	message.channel.send({inembed});

}

module.exports.help = {
	name: "in"
}