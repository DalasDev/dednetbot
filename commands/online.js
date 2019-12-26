
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.roles.some(r=>["Discord NPC Developer"].includes(r.name)))
    return;

  message.delete().catch(O_o=>{});
  message.channel.send("Я онлайн!");
}

module.exports.help = {
  name: "online"
}
