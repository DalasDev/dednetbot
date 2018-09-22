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

  var topusers = User.find().sort({infractions: -1}).limit(10).lean().exec(function(err, doc) {
    if(err)
      console.log(err);
    else{
      var infTag = "";
      if(infractions % 10 == 1){
        infTag = "варн";
      } else {
        infTag = (infractions % 10 == 2 || infractions % 10 == 3 || infractions % 10 == 4) ? "варна" : "варнов");
      }

      var text = `\n
        #1 ${doc[0].displayName}\n    ${numberWithCommas(doc[0].infractions)} ${infTag}\n
        #2 ${doc[1].displayName}\n    ${numberWithCommas(doc[1].infractions)} ${infTag}\n
        #3 ${doc[2].displayName}\n    ${numberWithCommas(doc[2].infractions)} ${infTag}\n
        #4 ${doc[3].displayName}\n    ${numberWithCommas(doc[3].infractions)} ${infTag}\n
        #5 ${doc[4].displayName}\n    ${numberWithCommas(doc[4].infractions)} ${infTag}\n
        #6 ${doc[5].displayName}\n    ${numberWithCommas(doc[5].infractions)} ${infTag}\n
        #7 ${doc[6].displayName}\n    ${numberWithCommas(doc[6].infractions)} ${infTag}\n
        #8 ${doc[7].displayName}\n    ${numberWithCommas(doc[7].infractions)} ${infTag}\n
        #9 ${doc[8].displayName}\n    ${numberWithCommas(doc[8].infractions)} ${infTag}\n
        #10 ${doc[9].displayName}\n   ${numberWithCommas(doc[9].infractions)} ${infTag}`;

        message.channel.send({embed: {
          color: 3447003,
          title: `**Retro Valley** :zap: **WARNS LEADERBOARD**`,
          fields: [
          {
            name: "(наши бундари)",
            value: "``"+text+"``"
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
  name: "infractions"
}
