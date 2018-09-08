//!removerole @member role

const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return;

  message.delete().catch(O_o=>{});

  let repchannel = message.guild.channels.find(`name`, "reports_bots");
	let errorschannel = message.guild.channels.find(`name`, "errors_bots");
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Похоже у тебя недостаточно на это прав, дружище :thinking:.");

  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember)
    return message.reply("пользователь не существует!");

  let role = args.join(" ").slice(22);
  if(!role)
    return message.reply("укажите роль!");

  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole)
    return message.reply("не могу найти роль!");

    if(!errorschannel)
      return message.channel.send("Канал ошибок не существует!");
    if(!repchannel){
      errorschannel.send("Канал репортов не существует!");
    }
    if(!repchannel)
      return message.channel.send("Канал репортов не существует!");

  if(!rMember.roles.has(gRole.id)) return message.reply(`У <@${rMember.id}> нет роли ${gRole.name}!`);
  await(rMember.removeRole(gRole.id));

    message.channel.send(`<@${rMember.id}> потерял роль ${gRole.name}! :ok_hand:`);
    repchannel.send(`<@${rMember.id}> потерял роль ${gRole.name}! :ok_hand:`);
}

module.exports.help = {
  name: "removerole"
}
