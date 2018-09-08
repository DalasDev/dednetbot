const Discord = require("discord.js");
const ms = require("ms");

//temprele @member  Role Time

module.exports.run = async (bot, message, args) => {

  //лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return;

  message.delete().catch(O_o=>{});

  if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Похоже у тебя недостаточно на это прав, дружище :thinking:.");
  let rMemberOld = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  var rMember = rMemberOld.replace("  ", " ").trim();
  if(!rMember) return message.reply("Пользователь не существует!");

  let role = args[1];
  if(!role) return message.reply("Укажите роль!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Не могу найти роль!");
  let roletime = args[2];
  if(!roletime) return message.reply("Укажите время");

  let repchannel = message.guild.channels.find(`name`, "reports_bots");
	let errorschannel = message.guild.channels.find(`name`, "errors_bots");

  if(!errorschannel)
    return message.channel.send("Канал ошибок не существует!");
  if(!repchannel){
    errorschannel.send("Канал репортов не существует!");
  }
  if(!repchannel)
    return message.channel.send("Канал репортов не существует!");

  await(rMember.addRole(gRole.id));

  message.channel.send(`Понял, принял! <@${rMember.id}> получил роль ${gRole.name} на ${ms(ms(roletime))}`);
  repchannel.send(`<@${rMember.id}> получил роль ${gRole.name} на ${ms(ms(roletime))}`);

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
