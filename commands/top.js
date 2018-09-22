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

  var topusers = User.find().sort({retrocoinTotal: -1}).limit(2).lean().exec(function(err, doc) {
    if(err)
      console.log(err);
    else{
      var n1 = doc[0].displayName;
      var n2 = doc[1].displayName;
      var s1 = doc[0].retrocoinTotal;
      var s2 = doc[1].retrocoinTotal;
      console.log("TOP1: "+n1+", score: "+s1+", TOP2: "+n2+", score: "+s2);
      const embed = new Discord.RichEmbed()
      .setTitle("Retro Valley Leaderboard")
      .setColor("#4C8BF5")
      .setThumbnail(retricIcon)
      .addField(doc[0].displayName, doc[0].retrocoinTotal, true)
      .addField(doc[1].displayName, doc[1].retrocoinTotal, true)

      message.channel.send({embed});
    }
  });
}

module.exports.help = {
  name: "top"
}
