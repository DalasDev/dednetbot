const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports.run = async (bot, message, args) => {

  var retricIcon = bot.emojis.find("name", "retric");

  if(!message.member.hasPermission("MANAGE_ROLES"))
    return;
  console.log("DB");
  var topusers = User.find().sort({retrocoinTotal: -1}).limit(10).lean().exec(function(err, doc) {
    if(err)
      console.log(err);
    else{
      const embed = new Discord.RichEmbed()
      .setTitle("Retro Valley Leaderboard")
      .setColor("#4C8BF5")
      .setThumbnail(retricIcon)
      .addField(`1) ${doc[0].displayName}`, doc[0].retrocoinTotal, true)
      .addField(`2) ${doc[1].displayName}`, doc[1].retrocoinTotal, true)
      .addField(`3) ${doc[2].displayName}`, doc[2].retrocoinTotal, true)
      .addField(`4) ${doc[3].displayName}`, doc[3].retrocoinTotal, true)
      .addField(`5) ${doc[4].displayName}`, doc[4].retrocoinTotal, true)
      .addField(`6) ${doc[5].displayName}`, doc[5].retrocoinTotal, true)
      .addField(`7) ${doc[6].displayName}`, doc[6].retrocoinTotal, true)
      .addField(`8) ${doc[7].displayName}`, doc[7].retrocoinTotal, true)
      .addField(`9) ${doc[8].displayName}`, doc[8].retrocoinTotal, true)
      .addField(`10) ${doc[9].displayName}`, doc[9].retrocoinTotal, true)

      message.channel.send({embed});
    }
  });
}

module.exports.help = {
  name: "top"
}
