const Discord = require("discord.js");
const ms = require("ms");

//tempmute @member Time

module.exports.run = async (bot, message, args) => {

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  if(!tomute)
    return message.reply("Пользователь не существует!");

  if(tomute.hasPermission("MANAGE_MESSAGES"))
    return message.reply("Этот пользователь не может быть замучен!");

  let muterole = message.guild.roles.find(`name`, "Наручники (Мут чата)");

  if(!muterole)
    return errorschannel.send("Роль мута не найдена!");

  let mutetime = args[1];

  if(!mutetime)
    return message.reply("Вы не указали время мута!");

  let repchannel = message.guild.channels.find(`name`, "reports");

  let errorschannel = message.guild.channels.find(`name`, "errors");

  if(!repchannel)
    return errorschannel.send("Канал отчетов не существует!");

  await(tomute.addRole(muterole.id));

  message.channel.send(`Понял, принял! <@${tomute.id}> был замучен на ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    repchannel.send(`<@${tomute.id}> был размучен!`);
  }, ms(mutetime));
}

module.exports.help = {
  name: "tempmute"
}