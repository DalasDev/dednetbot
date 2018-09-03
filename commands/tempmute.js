const Discord = require("discord.js");
const ms = require("ms");

//tempmute @member Time

module.exports.run = async (bot, message, args) => {

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let muterole = message.guild.roles.find(`name`, "Наручники (Мут чата)");
  let mutetime = args[1];
  let repchannel = message.guild.channels.find(`name`, "reports");
  let errorschannel = message.guild.channels.find(`name`, "errors");

  if(!message.member.hasPermission("MOVE_MEMBERS", "ADMINISTRATOR"))
		return message.channel.send("Похоже у тебя недостаточно на это прав, дружище :thinking:. ");

  if(!tomute)
    return message.reply("Пользователь не существует!");

  if(tomute.hasPermission("MANAGE_MESSAGES"))
    return message.reply("Этот пользователь не может быть замучен!");

  if(!muterole)
    return errorschannel.send("Роль мута не найдена!");

  if(!mutetime)
    return message.reply("Вы не указали время мута!");

  if(!repchannel)
    return errorschannel.send("Канал отчетов не существует!");

  await(tomute.addRole(muterole.id));

  message.channel.send(`Понял, принял! <@${tomute.id}> был замучен на ${ms(ms(mutetime))}`);

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
