//!removerole @member role

const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.delete().catch(O_o=>{});

  let repchannel = message.guild.channels.find(`name`, "🌘reports_bots");
  let errorschannel = message.guild.channels.find(`name`, "🌏errors_bots");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  let role = args.join(" ").slice(22);

  if((!message.member.hasPermission("MANAGE_ROLES")) || (!message.member.roles.some(r=>["Тех. Администратор", "Губернатор", "Тех. Стажер"].includes(r.name))))
    return message.reply("похоже у тебя недостаточно на это прав, дружище :thinking:.");
  if(!rMember)
    return message.reply("пользователь не существует!");
  if(!role)
    return message.reply("укажите роль!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole)
    return message.reply("указанная вами роль не существует!");
  if(!errorschannel)
    return message.channel.send("Канал ошибок не существует!");
  if(!repchannel)
    return errorschannel.send("Канал репортов не существует!");
  if(!repchannel)
    return message.channel.send("Канал репортов не существует!");
  if(!rMember.roles.has(gRole.id))
    return message.channel.send(`У <@${rMember.id}> нет роли ${gRole.name}!`);
  await(rMember.removeRole(gRole.id));

  message.channel.bulkDelete(args[0]).then(() => {
   message.channel.send(`<@${rMember.id}> потерял роль ${gRole.name}! :ok_hand:`).then(msg => msg.delete(10000));
  }
  repchannel.send(`<@${rMember.id}> потерял роль ${gRole.name}! :ok_hand:`);
}

module.exports.help = {
  name: "removerole"
}
