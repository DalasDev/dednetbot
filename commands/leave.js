const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.roles.some(r=>["Тех. Администратор", "Губернатор"].includes(r.name)))
    return;
  message.delete().catch(O_o=>{});

  if (bot.voiceChannel) {
    bot.voiceChannel.leave()
    .then(connection => {
      message.reply('до встречи!');
    })
    .catch(console.log);
  } else {
    message.reply('я не в войсе!');
  }
}

module.exports.help = {
	name: "leave"
}
