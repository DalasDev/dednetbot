const Discord = require("discord.js");

//kick @member reason

module.exports.run = async (bot, message, args) => {

	const kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!kUser)
		return message.channel.send("Пользователь не существует!");
	let kReason = args.join(" ").slice(22);

	if(!message.member.hasPermission("KICK_MEMBERS", "ADMINISTRATOR"))
		return message.channel.send("Похоже у тебя недостаточно на это прав, дружище :thinking:. ");
	if(kUser.hasPermission("MANAGE_MESSAGES"))
		return message.channel.send("Этот пользователь не может быть кикнут!");

	let embed = new Discord.RichEmbed()
	.setTitle("ОТЧЕТ О КИКЕ")
	.setColor("#DD5044")
	.addField("Кикнутый пользователь:", `${kUser}`, true)
	.addField("Пользователя кикнул:", `<@${message.author.id}>`, true)
	.addField("Кикнут в канале:", message.channel, true)
	.addField("Время кика:", message.createdAt, true)
	.addField("Был кикнут за:", kReason, true)

	let repchannel = message.guild.channels.find(`name`, "reports");
	let errorschannel = message.guild.channels.find(`name`, "errors");

	if(!repchannel)
		return errorschannel.send("Канал отчетов не существует!");

	message.guild.member(kUser).kick(kReason);

	message.channel.send(kUser+" был кикнут за "+ kReason);
	repchannel.send({embed});

}


module.exports.help = {
	name: "kick"
}