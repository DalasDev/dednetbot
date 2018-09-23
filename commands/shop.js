const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');
var Item = require('./../schemas/shop_model.js');

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports.run = async (bot, message, args) => {

  // var retricIcon = bot.emojis.find("name", "retric");

  if(!message.member.roles.some(r=>["Тех. Администратор", "Губернатор", "РетроТестер"].includes(r.name)))
    return;

  var items = Item.find().sort({itemPrice: 1}).limit(10).lean().exec(function(err, doc) {
    if(err)
      console.log(err);
    else{
      var maxX = doc.length;
      var x = 0;
      var y = 0;
      var text = ``;
      while (x < maxX){
        text += `**${y=x+1}.** ${doc[x].itemName} • **${numberWithCommas(doc[x++].itemPrice)} ретриков**\n`;
      }

      message.channel.send({embed: {
        color: 3447003,
        title: `**Retro Valley** :shopping_cart: **Магазин**`,
        fields: [
        {
          name: "(налетай-покупай)",
          value: text
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
  name: "shop"
}