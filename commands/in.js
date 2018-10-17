const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

//  	message.delete().catch(O_o=>{});

  let inembed = new Discord.RichEmbed()
  .setDescription(":sparkling_heart:Приглашение на сервер:sparkling_heart:")
  .setColor("#b600ff")
  .addField("https://discord.gg/Ft58PYH", "", true)
  .setFooter("Приглашай своих друганов)", "");

  message.channel.send(inembed);

}

module.exports.help = {
  name: "in"
}