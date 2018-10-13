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

  var n = message.content.search(",");
  var hmmIcon = bot.emojis.find("name", "hmm");

  if (n != -1)
    return message.channel.send("Запятые в статус ставить нельзя!");

  if (!args[0])
    return message.reply("укажите статус!");

  let status = message.content.split(" ").shift().toString().replace(/,/g, " ");
  status = status.replace(/\s\s+/g, ' ');

  if (status.length >= 20)
    return message.reply(`слишком длинный статус, сорян ${hmmIcon}`)

  var user_obj = User.findOne({
    userID: message.member.id
  }, function (err, foundObj) {
    if (err)
      console.log("Error on database findOne: " + err);
    else {
      if (!foundObj)
        console.log("Something stange happend");
      else {
        foundObj.status = status;
        foundObj.save(function(err, updatedObj){
          if(err)
            console.log(err);
        })
      }
    }
  });
  message.reply(`Статус изменен на ${status}`);
}

module.exports.help = {
  name: "changestatus"
}
