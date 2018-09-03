const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

	let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	let repchannel = message.guild.channels.find(`name`, "reports");
	let errorschannel = message.guild.channels.find(`name`, "errors");
	let reason = args.join(" ").slice(22);

	if(!rUser)
		return message.channel.send("Пользователь не существует!");
	if(!repchannel)
		return errorschannel.send("Канал жалоб не существует!");

	let embed = new Discord.RichEmbed()
	.setTitle("ЖАЛОБА")
	.setColor("#F76806")
	.addField("Жалоба на:", `${rUser}`, true)
	.addField("Жалобу подал:", `${message.author}`, true)
	.addField("Канал:", message.channel, true)
	.addField("Время создания жалобы:", message.createdAt, true)
	.addField("Жалоба:", reason, true)

	message.channel.send(`${message.author}`+", жалоба отправлена!");

	message.delete().catch(O_o=>{});
	repchannel.send({embed});
}

module.exports.help = {
	name: "report"
}
