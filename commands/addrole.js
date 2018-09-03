//!addrole @member role

const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Похоже у тебя недостаточно на это прав, дружище :thinking:.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Пользователь не существует!");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Укажите роль!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Не могу найти роль!");

  if(rMember.roles.has(gRole.id)) return message.reply("У него уже есть эта роль!");
  await(rMember.addRole(gRole.id));

  message.channel.send(`<@${rMember.id}> получил роль ${gRole.name}! :ok_hand:`);
  
}

module.exports.help = {
  name: "addrole"
}
