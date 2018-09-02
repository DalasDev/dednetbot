//!addrole @member role

const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  console.log("Addrole loaded");

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Похоже у тебя недостаточно на это прав, дружище :thinking:.");
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.get(args[0]);
    if(!rMember) return message.reply("Пользователь не существует!");
    let role = args.join(" ").slice(22);
    if(!role) return message.reply("Укажите роль!");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return mesage.reply("Роль не существует!");

    if(rMember.roles.has(gRole.id));
    await(rMember.addRole(gRole.id));

    try{
      rMember.send(`Ты получил роль ${gRole.name}!`)
    }catch(e){
    message.channel.send(`<@${rMember.id}> получил роль ${gRole.name}!`)
  }
}

module.exports.help = {
  name: "addrole"
}
