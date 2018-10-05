const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.delete().catch(O_o=>{});

  if(!message.member.roles.some(r=>["Тех. Администратор", "Губернатор", "⭐Полицейский⭐", "⭐Шерифский департамент⭐"].includes(r.name)))
    return;

  let pnuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let cnchannel = message.guild.channels.find(`name`, "#👥черный_рынок");
  let pchannel = message.guild.channels.find(`name`, "#📌правила");
  let kchannel = message.guild.channels.find(`name`, "#📵канализация");

  message.channel.send(`${pnuser}, маты запрещены вне чата ${kchannel.id}! И прочти пожалуйста ${pchannel.id} :smiley:`)
}

module.exports.help = {
	name: "mat"
}
