const Discord = require("discord.js");
const ms = require("ms");

//voicemute @member Time

module.exports.run = async (bot, message, args) => {

  let tovmute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let vmutetime = args[1];
  let repchannel = message.guild.channels.find(`name`, "reports");
  let errorschannel = message.guild.channels.find(`name`, "errors");

  if(!message.member.hasPermission("MOVE_MEMBERS", "ADMINISTRATOR"))
    return message.channel.send("Похоже у тебя недостаточно на это прав, дружище :thinking:. ");

  if(!tovmute)
    return message.reply("пользователь не существует!");

  if(tovmute.hasPermission("MANAGE_MESSAGES"))
    return message.reply("этот пользователь не может быть замучен!");

  if(!vmutetime)
    return message.reply("вы не указали время мута!");

  if(!repchannel)
    return errorschannel.send("Канал отчетов не существует!");

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
