const Discord = require("discord.js");
const ms = require("ms");

//tempmute @member Time

module.exports.run = async (bot, message, args) => {

  //лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return;

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let muterole = message.guild.roles.find(`name`, "Наручники (Мут чата)");
  let mutetime = args[1];
  let repchannel = message.guild.channels.find(`name`, "🌘reports_bots");
  let errorschannel = message.guild.channels.find(`name`, "🌏errors_bots");

  //лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return;
  if(!message.member.hasPermission("MOVE_MEMBERS", "ADMINISTRATOR"))
    return message.channel.send("Похоже у тебя недостаточно на это прав, дружище :thinking:. ");
  if(!tomute)
    return message.reply("пользователь не существует!");
  if(tomute.hasPermission("MANAGE_MESSAGES"))
    return message.reply("этот пользователь не может быть замучен!");
  if(!muterole)
    return errorschannel.send("Роль мута не найдена!");
  if(!mutetime)
    return message.reply("вы не указали время мута!");
  if(!errorschannel)
    return message.channel.send("Канал ошибок не существует!");
  if(!repchannel)
    return message.channel.send("Канал репортов не существует!");
  await(tomute.addRole(muterole.id));

  message.channel.send(`Понял, принял! <@${tomute.id}> был замучен на ${ms(ms(mutetime))}`);
  repchannel.send(`<@${tomute.id}> был замучен на ${ms(ms(mutetime))}`);

  setTimeout(function(){
    if(tomute.roles.has(muterole.id)){
      tomute.removeRole(muterole.id);
      repchannel.send(`<@${tomute.id}> был размучен!`);
    }
  }, ms(mutetime));
}

module.exports.help = {
  name: "tempmute"
}
