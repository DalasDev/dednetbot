const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

//  	message.delete().catch(O_o=>{});

	let bicon = bot.user.avatarURL;

	let linkembed = new Discord.RichEmbed()

	.setDescription(":fire:Интересные ссылки:fire:")
	.setThumbnail(bicon)
	.setColor("#FF7700")
	.addField("Канал Салливана", "https://www.youtube.com/channel/UCnK6AKESj7cxltJkAsEMsXA", true)
	.addField("Группа в ВК", "https://vk.com/sallyshow", true)
	.addField("Банда в Steam", "https://steamcommunity.com/groups/sallywan_club", true)
	.setImage("https://cdn.discordapp.com/attachments/484779088687661057/502095696724361226/channels4_banner.jpg");

	message.channel.send({linkembed});

}

module.exports.help = {
	name: "links"
}
