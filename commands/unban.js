const Discord = require("discord.js");

//unban @member

module.exports.run = async (bot, message, args) => {

  let tounban = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let repchannel = message.guild.channels.find(`name`, "reports");
  let errorschannel = message.guild.channels.find(`name`, "errors");

  if(!message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR"))
    return message.channel.send("Похоже у тебя недостаточно на это прав, дружище :thinking:. ");

  if(!tounban)
    return message.reply("Пользователь не существует!");

  if(!errorschannel)
    return message.reply("Каналы ошибок не существует!");

  if(!repchannel)
    return errorschannel.send("Канал отчетов не существует!");

  repchannel.send(`<@${tounban.id}> был разбанен администратором!`);

  guild.unban(tounban);

  message.channel.send(`Есть, капитан! <@${tounban.id}> теперь снова получил визу в наш город! :ok_hand: `);

}

module.exports.help = {
  name: "unban"
}
