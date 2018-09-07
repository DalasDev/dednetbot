const Discord = require("discord.js");

//voiceunmute @member Time

module.exports.run = async (bot, message, args) => {

  let tovunmute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let vmuterole = message.guild.roles.find(`name`, "Изолятор (Ноу_коннект)");
  let repchannel = message.guild.channels.find(`name`, "reports");
  let errorschannel = message.guild.channels.find(`name`, "errors");

  if(!tovunmute)
    return message.reply("пользователь не существует!");

  if(!vmuterole)
    return errorschannel.send("Роль мута не найдена!");

  if(!errorschannel)
    return message.reply("каналы ошибок не существует!");

  if(!repchannel)
    return errorschannel.send("Канал отчетов не существует!");

  if(!tovunmute.roles.has(vmuterole.id))
    return message.reply("пользователь не замучен!");

  repchannel.send(`Голос <@${tovunmute.id}> был размучен администратором!`);

  await(tovunmute.removeRole(vmuterole.id));

  message.channel.send(`Есть, капитан! <@${tovunmute.id}> снова может говорить! :ok_hand: `);

}

module.exports.help = {
  name: "voiceunmute"
}
