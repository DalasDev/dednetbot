const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

	//лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return;

  message.delete().catch(O_o=>{});

	let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	let repchannel = message.guild.channels.find(`name`, "🌘reports_bots");
	let errorschannel = message.guild.channels.find(`name`, "errors_bots");
	let reason = args.join(" ").slice(22);

	if(!rUser)
		return message.channel.send("Пользователь не существует!");

  if(!errorschannel)
  	return message.channel.send("Канал ошибок не существует!");
  if(!repchannel){
  	errorschannel.send("Канал репортов не существует!");
  }
  if(!repchannel)
  	return message.channel.send("Канал репортов не существует!");

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
