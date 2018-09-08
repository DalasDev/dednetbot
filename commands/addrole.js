//!addrole @member role

const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return;

  message.delete().catch(O_o=>{});

  let repchannel = message.guild.channels.find(`name`, "🌘reports_bots");
	let errorschannel = message.guild.channels.find(`name`, "🌏errors_bots");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  let role = args.join(" ").slice(22);
  let gRole = message.guild.roles.find(`name`, role);

  if(!message.member.hasPermission("MANAGE_ROLES"))
    return message.reply("Похоже у тебя недостаточно на это прав, дружище :thinking:.");
  if(!rMember)
    return message.reply("Пользователь не существует!");
  if(!role)
    return message.reply("Укажите роль!");
  if(!gRole)
    return message.reply("Не могу найти роль!");
  if(!errorschannel)
		return message.channel.send("Канал ошибок не существует!");
	if(!repchannel)
		errorschannel.send("Канал репортов не существует!");
	if(!repchannel)
		return message.channel.send("Канал репортов не существует!");
  if(rMember.roles.has(gRole.id))
    return message.reply("У него уже есть эта роль!");
  await(rMember.addRole(gRole.id));

  message.channel.send(`<@${rMember.id}> получил роль ${gRole.name}! :ok_hand:`);
  repchannel.send(`<@${rMember.id}> получил роль ${gRole.name}! :ok_hand:`);

}

module.exports.help = {
  name: "addrole"
}
