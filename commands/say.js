
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

      let mainchannel = message.guild.channels.find(`name`, "general");
      if(!message.member.roles.some(r=>["Разраб"].includes(r.name)))
       return;
      const sayMessage = args.join(" ");
      message.delete().catch();
      mainchannel.send(sayMessage);
}

module.exports.help = {
  name: "say"
}
