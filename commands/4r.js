const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.delete().catch(O_o=>{});

  var hmmIcon = bot.emojis.find("name", "hmm");

  if(!message.member.roles.some(r=>["РетроТестер", "Тех. Администратор", "Губернатор", "⭐Полицейский⭐", "⭐Шерифский департамент⭐", "Городской супергерой ⚡"].includes(r.name)))
    return;

  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!user)
  	return;
  let cnchannel = message.guild.channels.find(`name`, "👥черный_рынок");
  let pchannel = message.guild.channels.find(`name`, "📌правила");

  message.channel.send(`${user}, продавать, отдавать или покупать что либо можно только в чате ${cnchannel}! И прочти пожалуйста ${pchannel} ${hmmIcon}`)
}

module.exports.help = {
	name: "4r"
}
