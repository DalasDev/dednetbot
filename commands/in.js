const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

//	message.delete().catch(O_o=>{});

	let bicon = bot.user.avatarURL;
	const embed = new Discord.RichEmbed()
	.setTitle(":sparkling_heart: Приглашение на сервер :sparkling_heart:")
	.setColor("#B600FF")
	.setThumbnail(bicon)
	.addField("https://discord.gg/Ft58PYH", ":fire:", true)
	.setFooter("Приглашай своих друганов)", "")

	message.channel.send({embed});
}


module.exports.help = {
	name: "in"
}