const Discord = require("discord.js");

//voiceunmute @member Time

module.exports.run = async (bot, message, args) => {

  let tovunmute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let repchannel = message.guild.channels.find(`name`, "reports");
  let errorschannel = message.guild.channels.find(`name`, "errors");

  //лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return;

  if(!message.member.hasPermission("MOVE_MEMBERS", "ADMINISTRATOR"))
    return message.channel.send("Похоже у тебя недостаточно на это прав, дружище :thinking:. ");

  if(!tovunmute)
    return message.reply("пользователь не существует!");

  if(!errorschannel)
    return message.reply("каналы ошибок не существует!");

  if(!repchannel)
    return errorschannel.send("Канал отчетов не существует!");

  repchannel.send(`Голос <@${tovunmute.id}> был размучен администратором!`);

  await(tovunmute.setMute(false));

  repchannel.send(`Голос <@${tovunmute.id}> был размучен администратором!`);
  message.channel.send(`Есть, капитан! <@${tovunmute.id}> снова может говорить! :ok_hand: `);

}

module.exports.help = {
  name: "voiceunmute"
}
