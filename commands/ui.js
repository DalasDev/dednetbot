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

  if(!args[0]){

    var retricIcon = bot.emojis.find("name", "retric");
    var hmmIcon = bot.emojis.find("name", "hmm");

    var user_obj = User.findOne({
      userID: message.member.id
    }, function (err, foundObj) {
      if (err)
        console.log("Error on database findOne: " + err);
      else {
        if (!foundObj)
          console.log("Something stange happend");
        else {

          message.channel.send({embed: {
            color: 3447003,
            icon_url: message.guild.iconURL,
            title: `**Retro Valley** :zap: **${message.member.displayName}**`,
            description: `(**высшая роль :** __**${message.member.highestRole.name}**__)`,
            fields: [
            {
              name: `***Личный статус*** :speech_left:`,
              value: `${foundObj.status}`
            },
            {
              name: `***Кол-во сообщений за все время*** :speech_left:`,
              value: `${foundObj.mainmessages}`
            },
            {
              name: `***Личный баланс : *** ${numberWithCommas(foundObj.retrocoinTotal)} ${retricIcon}`,
              value: `__**Нарушений**__ : ${foundObj.infractions}`
            },
            {
              name: "***Взаимодействия :***",
              value: `Половых актов : ${foundObj.fcked}\nПоцелован(а) : ${foundObj.kissed}\nОбнят(а) : ${foundObj.huged}\nПобит(а) : ${foundObj.hit}\nУбит(а) : ${foundObj.killed}\nЗапой : ${foundObj.drunk}`
            },
            {
              name: "***Доступные перки :***",
              value: ":red_circle: закрыто\n:red_circle: закрыто\n:red_circle: закрыто\n:red_circle: закрыто\n:red_circle: закрыто\n:red_circle: закрыто\n:red_circle: закрыто\n:red_circle: закрыто\n:red_circle: закрыто"
            }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: message.author.avatarURL,
              text: `© ${message.member.displayName}`
            },
            thumbnail: {
              url: `${message.member.user.avatarURL}`
            }
          }
        });
          // foundObj.save(function(err, updatedObj){
          //   if(err)
          //     console.log(err);
          // });
        }
      }
    });
  } else {
    let iUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!iUser)
      return message.reply("пользователь не найден / не указан!");

    var retricIcon = bot.emojis.find("name", "retric");
    var hmmIcon = bot.emojis.find("name", "hmm");

    var user_obj = User.findOne({
      userID: iUser.id
    }, function (err, foundObj) {
      if (err)
        console.log("Error on database findOne: " + err);
      else {
        if (!foundObj)
          console.log("Something stange happend");
        else {

          message.channel.send({embed: {
            color: 3447003,
            icon_url: message.guild.iconURL,
            title: `**Retro Valley** :zap: **${iUser.displayName}**`,
            description: `(**высшая роль :** __**${iUser.highestRole.name}**__)`,
            fields: [
            {
              name: `***Личный статус*** :speech_left:`,
              value: `${foundObj.status}`
            },
            {
              name: `***Кол-во сообщений за все время*** :speech_left:`,
              value: `${foundObj.mainmessages}`
            },
            {
              name: `***Личный баланс : *** ${numberWithCommas(foundObj.retrocoinTotal)} ${retricIcon}`,
              value: `__**Нарушений**__ : ${foundObj.infractions}`
            },
            {
              name: "***Взаимодействия :***",
              value: `Половых актов : ${foundObj.fcked}\nПоцелован(а) : ${foundObj.kissed}\nОбнят(а) : ${foundObj.huged}\nПобит(а) : ${foundObj.hit}\nУбит(а) : ${foundObj.killed}\nЗапой : ${foundObj.drunk}`
            },
            {
              name: "***Доступные перки :***",
              value: ":red_circle: закрыто\n:red_circle: закрыто\n:red_circle: закрыто\n:red_circle: закрыто\n:red_circle: закрыто\n:red_circle: закрыто\n:red_circle: закрыто\n:red_circle: закрыто\n:red_circle: закрыто"
            }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: message.author.avatarURL,
              text: `© ${message.member.displayName}`
            },
            thumbnail: {
              url: `${iUser.user.avatarURL}`
            }
          }
        });
          // foundObj.save(function(err, updatedObj){
          //   if(err)
          //     console.log(err);
          // });
        }
      }
    });
  }
}

module.exports.help = {
  name: "ui"
}
