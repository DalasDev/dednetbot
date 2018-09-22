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

  var topusers = User.find().sort({retrocoinTotal: -1}).limit(10).lean().exec(function(err, doc) {
    if(err)
      console.log(err);
    else{
      var text = `${doc[0].displayName} : ${numberWithCommas(doc[0].retrocoinTotal)}\n
                    ${doc[1].displayName} : ${numberWithCommas(doc[1].retrocoinTotal)}\n
                    ${doc[2].displayName} : ${numberWithCommas(doc[2].retrocoinTotal)}\n
                    ${doc[3].displayName} : ${numberWithCommas(doc[3].retrocoinTotal)}\n
                    ${doc[4].displayName} : ${numberWithCommas(doc[4].retrocoinTotal)}\n
                    ${doc[5].displayName} : ${numberWithCommas(doc[5].retrocoinTotal)}\n
                    ${doc[6].displayName} : ${numberWithCommas(doc[6].retrocoinTotal)}\n
                    ${doc[7].displayName} : ${numberWithCommas(doc[7].retrocoinTotal)}\n
                    ${doc[8].displayName} : ${numberWithCommas(doc[8].retrocoinTotal)}\n
                    ${doc[9].displayName} : ${numberWithCommas(doc[9].retrocoinTotal)}`;
        
        message.channel.send({embed: {
          color: 3447003,
          title: `**Retro Valley** :zap: **LEADERBOARD**`,
          fields: [
          {
            name: "(кошелек просто по швам идет)",
            value: "```"+text+"```"
          }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: message.author.avatarURL,
            text: `© ${message.member.displayName}`
          },
        }
      });
    }
  });
}

module.exports.help = {
  name: "top"
}
