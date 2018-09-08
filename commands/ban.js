const Discord = require("discord.js");

//ban @member reason

module.exports.run = async (bot, message, args) => {

	const bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	let repchannel = message.guild.channels.find(`name`, "reports_bots");
	let errorschannel = message.guild.channels.find(`name`, "errors_bots");
	let bReason = args.join(" ").slice(22);

	if(!bUser)
		return message.channel.send("Пользователь не существует!");
	if(!message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR"))
		return message.channel.send("Похоже у тебя недостаточно на это прав, дружище :thinking:.");
	if(bUser.hasPermission("MANAGE_MESSAGES"))
		return message.channel.send("Этот пользователь не может быть забанен!");
	if(!repchannel)
		return errorschannel.send("Канал отчетов не существует!");

	let embed = new Discord.RichEmbed()
	.setTitle("ОТЧЕТ О БАНЕ")
	.setColor("#DD5044")
	.addField("Забаненный пользователь:", `${bUser}`, true)
	.addField("Пользователя забанил:", `<@${message.author.id}>`, true)
	.addField("Забанен в канале:", message.channel, true)
	.addField("Время бана:", message.createdAt, true)
	.addField("Был забанен за:", bReason, true)

	message.guild.member(bUser).ban(bReason);

	message.channel.send(bUser+" был забанен за "+ bReason);
	repchannel.send({embed});
}

module.exports.help = {
	name: "ban"
}
