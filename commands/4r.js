const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.delete().catch(O_o=>{});

  if(!message.member.roles.some(r=>["РетроТестер", "Тех. Администратор", "Губернатор", "⭐Полицейский⭐", "⭐Шерифский департамент⭐"].includes(r.name)))
    return;

  let pnuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!pnuser)
  	return;
  let cnchannel = message.guild.channels.find(`name`, "👥черный_рынок");
  let pchannel = message.guild.channels.find(`name`, "📌правила");

  message.channel.send(`${pnuser}, продавать, отдавать или покупать что либо можно только в чате ${cnchannel}! И прочти пожалуйста ${pchannel} :smiley:`)
}

module.exports.help = {
	name: "4r"
}
