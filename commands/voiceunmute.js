const Discord = require("discord.js");

//voiceunmute @member Time

module.exports.run = async (bot, message, args) => {

  let tovunmute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let repchannel = message.guild.channels.find(`name`, "reports");
  let errorschannel = message.guild.channels.find(`name`, "errors");

  if(!tovunmute)
    return message.reply("Пользователь не существует!");

  if(!errorschannel)
    return message.reply("Каналы ошибок не существует!");

  if(!repchannel)
    return errorschannel.send("Канал отчетов не существует!");


  await(tovunmute.setMute(false));

  repchannel.send(`Голос <@${tovunmute.id}> был размучен администратором!`);
  message.channel.send(`Есть, капитан! <@${tovunmute.id}> снова может говорить! :ok_hand: `);

}

module.exports.help = {
  name: "voiceunmute"
}
