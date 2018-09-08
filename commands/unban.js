const Discord = require("discord.js");

//unban @member

module.exports.run = async (bot, message, args) => {

  let tounban = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let repchannel = message.guild.channels.find(`name`, "reports_bots");
  let errorschannel = message.guild.channels.find(`name`, "errors_bots");

  message.delete().catch(O_o=>{});

  //лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return;

  if(!message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR"))
    return message.channel.send("Похоже у тебя недостаточно на это прав, дружище :thinking:. ");

  if(!errorschannel)
    return message.channel.send("Канал ошибок не существует!");
  if(!repchannel){
    errorschannel.send("Канал репортов не существует!");
  }
  if(!repchannel)
    return message.channel.send("Канал репортов не существует!");


  repchannel.send(`<@${tounban.id}> был разбанен администратором!`);

  message.guild.unban(tounban);

  message.channel.send(`Есть, капитан! <@${tounban.id}> теперь снова получил визу в наш город! :ok_hand: `);

}

module.exports.help = {
  name: "unban"
}
