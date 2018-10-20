//!removerole @member role

const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
  if(!message.member.hasPermission("MANAGE_ROLES"))
    return;

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
    return message.reply("не могу найти роль!");
  if(!errorschannel)
    return message.channel.send("Канал ошибок не существует!");
  if(!repchannel)
    return errorschannel.send("Канал репортов не существует!");
  if(!repchannel)
    return message.channel.send("Канал репортов не существует!");
  if(!rMember.roles.has(role.id))
    return message.reply(`У <@${rMember.id}> нет роли ${role.name}!`);
  await(rMember.removeRole(role.id));

  message.channel.send(`<@${rMember.id}> потерял роль ${role.name}! :ok_hand:`);
  repchannel.send(`<@${rMember.id}> потерял роль ${role.name}! :ok_hand:`);
}

module.exports.help = {
  name: "removerole"
}
