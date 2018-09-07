const Discord = require("discord.js");
const ms = require("ms");

//temprele @member  Role Time

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Похоже у тебя недостаточно на это прав, дружище :thinking:.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Пользователь не существует!");
  let role = args[2];
  if(!role) return message.reply("Укажите роль!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Не могу найти роль!");
  let roletime = args[3];
  if(!roletime) return message.reply("Укажите время");

  let repchannel = message.guild.channels.find(`name`, "reports");
  let errorschannel = message.guild.channels.find(`name`, "errors");

  if(!repchannel)
    return errorschannel.send("Канал отчетов не существует!");

  await(rMember.addRole(gRole.id));

  message.channel.send(`Понял, принял! <@${rMember.id}> получил роль ${gRole.id} на ${ms(ms(roletime))}`);

  setTimeout(function(){
    if(rMember.roles.has(gRole.id)){
      rMember.removeRole(gRole.id);
      repchannel.send(`<@${rMember.id}> потерял роль ${gRole.id} автоматически!`);
    }
  }, ms(roletime));
}

module.exports.help = {
  name: "temprole"
}
