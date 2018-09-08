const Discord = require("discord.js");

//kick @member reason

module.exports.run = async (bot, message, args) => {

	const kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	let kReason = args.join(" ").slice(22);
	let repchannel = message.guild.channels.find(`name`, "reports_bots");
	let errorschannel = message.guild.channels.find(`name`, "errors_bots");

	//лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
	  if(!message.member.hasPermission("MANAGE_MESSAGES"))
	    return;

	message.delete().catch(O_o=>{});

	if(!kUser)
		return message.channel.send("Пользователь не существует!");
	if(!message.member.hasPermission("KICK_MEMBERS", "ADMINISTRATOR"))
		return message.channel.send("Похоже у тебя недостаточно на это прав, дружище :thinking:. ");
	if(kUser.hasPermission("MANAGE_MESSAGES"))
		return message.channel.send("Этот пользователь не может быть кикнут!");

	if(!errorschannel)
		return message.channel.send("Канал ошибок не существует!");
	if(!repchannel){
		errorschannel.send("Канал репортов не существует!");
	}
	if(!repchannel)
		return message.channel.send("Канал репортов не существует!");

	let embed = new Discord.RichEmbed()
	.setTitle("ОТЧЕТ О КИКЕ")
	.setColor("#DD5044")
	.addField("Кикнутый пользователь:", `${kUser}`, true)
	.addField("Пользователя кикнул:", `<@${message.author.id}>`, true)
	.addField("Кикнут в канале:", message.channel, true)
	.addField("Время кика:", message.createdAt, true)
	.addField("Был кикнут за:", kReason, true)

	message.guild.member(kUser).kick(kReason);

	message.channel.send(kUser+" был кикнут за "+ kReason);
	repchannel.send({embed});
}


module.exports.help = {
	name: "kick"
}
