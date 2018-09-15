const Discord = require("discord.js");
const ms = require("ms");

//voicemute @member Time

module.exports.run = async (bot, message, args) => {

  let tovmute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let vmutetime = args[1];
  let vmreason = args.join(" ").slice(22);
  let repchannel = message.guild.channels.find(`name`, "🌘reports_bots");
  let errorschannel = message.guild.channels.find(`name`, "🌏errors_bots");

  //лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return;
  if(!message.member.hasPermission("MOVE_MEMBERS", "ADMINISTRATOR"))
    return message.channel.send("Похоже у тебя недостаточно на это прав, дружище :thinking:. ");
  if(!tovmute)
    return message.reply("пользователь не существует!");
  if(tovmute.hasPermission("MANAGE_ROLES"))
    return message.reply("этот пользователь не может быть замучен!");
  if(!vmutetime)
    return message.reply("вы не указали время мута!");
  if(!errorschannel)
  	return message.channel.send("Канал ошибок не существует!");
	if(!repchannel)
		errorschannel.send("Канал репортов не существует!");
  if(!repchannel)
  	return message.channel.send("Канал репортов не существует!");


    const embed = new Discord.RichEmbed()
    .setTitle(":star: Отчет о войсмуте :star:")
    .setColor("#fc6400")
    .addField("Жертва", `<@${tovmute.id}>`, true)
    .addField("Мут выдан в", message.channel, true)
    .addField("Мут выдал", message.member, true)
    .addField("Причина", vmreason, true);

    repchannel.send({embed});

  await(tovmute.setMute(true));

  message.channel.send(`Понял, принял! <@${tovmute.id}> теперь немой на ${ms(ms(vmutetime))}! :ok_hand:`);

  setTimeout(function(){
      tovmute.setMute(false);
      repchannel.send(`<@${tovmute.id}> снова может говорить!`);
  }, ms(vmutetime));
}

module.exports.help = {
  name: "voicemute"
}
