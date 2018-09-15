const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var warnUser = require('./../schemas/warn_model.js');

//warn2 (Mee6 warns)

module.exports.run = async (bot, message, args) => {

  let warnchannel = message.guild.channels.find(`name`, "🌘reports_bots");
  let errorschannel = message.guild.channels.find(`name`, "🌏errors_bots");

  let sicon = message.guild.iconURL;

  const sellMessage = args.join(" ");

  const embed = new Discord.RichEmbed()
  .setTitle("Возможный багоюзер")
  .setColor("#ff0000")
  .addField("Возможный нарушитель", message.member, true)
  .addField("Попытался юзануть команду в", message.channel, true)
  .addField("Полный текст", sellMessage, true);

  if(warnchannel){
    warnchannel.send({embed});
  } else {
    console.log("No warnchannel defined");
  }
}

module.exports.help = {
  name: "sellscan"
}
