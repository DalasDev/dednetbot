const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.delete().catch(O_o=>{});

  let pnuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  message.channel.send(`<@${pnuser}> продавать, отдавать или покупать что либо можно только в чате #👥черный_рынок! И прочти пожалуйста #📌правила =)`)
}

module.exports.help = {
	name: "4r"
}
