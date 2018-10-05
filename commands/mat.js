const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.delete().catch(O_o=>{});

  if(!message.member.roles.some(r=>["Тех. Администратор", "Губернатор", "⭐Полицейский⭐", "⭐Шерифский департамент⭐"].includes(r.name)))
    return;

  let pnuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  message.channel.send(`<@${pnuser}>, маты запрещены вне чата #📵канализация! И прочти пожалуйста #📌правила =)`)
}

module.exports.help = {
	name: "mat"
}
