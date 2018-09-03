const Discord = require("discord.js");
const ms = require("ms");

//voicemute @member Time

module.exports.run = async (bot, message, args) => {

  let tovmute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let vmuterole = message.guild.roles.find(`name`, "Изолятор (Ноу_коннект)");
  let vmutetime = args[1];
  let repchannel = message.guild.channels.find(`name`, "reports");
  let errorschannel = message.guild.channels.find(`name`, "errors");

  if(!message.member.hasPermission("MOVE_MEMBERS", "ADMINISTRATOR"))
		return message.channel.send("Похоже у тебя недостаточно на это прав, дружище :thinking:. ");

  if(!tovmute)
    return message.reply("Пользователь не существует!");

  if(tovmute.hasPermission("MANAGE_MESSAGES"))
    return message.reply("Этот пользователь не может быть замучен!");

  if(!vmuterole)
    return errorschannel.send("Роль мута не найдена!");

  if(!vmutetime)
    return message.reply("Вы не указали время мута!");

  if(!repchannel)
    return errorschannel.send("Канал отчетов не существует!");

  await(tovmute.addRole(vmuterole.id));

  message.channel.send(`Понял, принял! <@${tovmute.id}> был замучен на ${ms(ms(vmutetime))}`);

  setTimeout(function(){
    if(tovmute.roles.has(vmuterole.id)){
        tovmute.removeRole(vmuterole.id);
        repchannel.send(`<@${tovmute.id}> был размучен!`);
    }
  }, ms(vmutetime));
}

module.exports.help = {
  name: "voicemute"
}
