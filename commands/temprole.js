const Discord = require("discord.js");
const ms = require("ms");

//temprele @member  Role Time

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Похоже у тебя недостаточно на это прав, дружище :thinking:.");
<<<<<<< HEAD
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Пользователь не существует!");
=======
  let rMemberOld = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  console.log("Member object: " + JSON.stringify(rMemberOld));
  var rMember = rMemberOld.replace("  ", " ").trim();
  if(!rMember) return message.reply("Пользователь не существует!");

>>>>>>> 5b314ed9dcda15e53343138f6e6b76f701cd35bf
  let role = args[1];
  if(!role) return message.reply("Укажите роль!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Не могу найти роль!");
  let roletime = args[2];
  if(!roletime) return message.reply("Укажите время");

  let repchannel = message.guild.channels.find(`name`, "reports");
  let errorschannel = message.guild.channels.find(`name`, "errors");

  if(!repchannel)
    return errorschannel.send("Канал отчетов не существует!");

  await(rMember.addRole(gRole.id));

  message.channel.send(`Понял, принял! <@${rMember.id}> получил роль ${gRole.name} на ${ms(ms(roletime))}`);

  setTimeout(function(){
    if(rMember.roles.has(gRole.id)){
      rMember.removeRole(gRole.id);
      repchannel.send(`<@${rMember.id}> потерял роль ${gRole.name} автоматически!`);
    }
  }, ms(roletime));
}

module.exports.help = {
  name: "temprole"
}
