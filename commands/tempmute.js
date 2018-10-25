const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");

var Warn = require('./../schemas/warn_model.js');
var User = require('./../schemas/user_model.js');
var Moderation = require('./../schemas/report_model.js');
var Infraction = require('./../schemas/infractions_model.js');

function formatDate(date) {
  var monthNames = [
    "января", "февраля", "марта",
    "апреля", "мая", "июня", "июля",
    "августа", "сентября", "октября",
    "ноября", "декабря"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var time = hour + ":" + minute + ":" + second;

  return day + ' ' + monthNames[monthIndex] + ' ' + year + ', ' + time;
}

//tempmute @member Time

module.exports.run = async (bot, message, args) => {

  var moder = message.member;

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let muterole = message.guild.roles.find(`name`, "Наручники (Мут чата)");
  let mutetime = args[1];
  let mreason = args.join(" ").slice(22);
  let repchannel = message.guild.channels.find(`name`, "🌘reports_bots");
  let errorschannel = message.guild.channels.find(`name`, "🌏errors_bots");

  if(!message.member.hasPermission("MOVE_MEMBERS", "ADMINISTRATOR"))
    return message.channel.send("Похоже у тебя недостаточно на это прав, дружище :thinking:. ");
  if(!tomute)
    return message.reply("пользователь не существует!");
  if(tomute.hasPermission("MANAGE_MESSAGES"))
    return message.reply("этот пользователь не может быть замучен!");
  if(!muterole)
    return errorschannel.send("Роль мута не найдена!");
  if(!mutetime)
    return message.reply("вы не указали время мута!");
  if(!errorschannel)
    return message.channel.send("Канал ошибок не существует!");
  if(!repchannel)
    return message.channel.send("Канал репортов не существует!");
  await(tomute.addRole(muterole.id));

  message.channel.send(`Понял, принял! <@${tomute.id}> был замучен на ${ms(ms(mutetime))}`);

  const embed = new Discord.RichEmbed()
  .setTitle(":star: Отчет о муте :star:")
  .setColor("#fc6400")
  .addField("Жертва", `<@${tomute.id}>`, true)
  .addField("Мут выдан в", message.channel, true)
  .addField("Мут выдал", message.member, true)
  .addField(`Время выдачи мута:`, formatDate(new Date()), true)
  .addField("Причина:", mreason, true);

  repchannel.send({embed});

  setTimeout(function(){
    if(tomute.roles.has(muterole.id)){
      tomute.removeRole(muterole.id);
      repchannel.send(`<@${tomute.id}> был размучен!`);
    }
  }, ms(mutetime));

  var iData = new Infraction({
    infractionType: "4r",
    infractedID: user.id,
    userNickname: user.displayName,
    infractedBy: message.member.id,
    infracterNickname: message.member.displayName,
    when: Date.now(),
    channelID: message.channel.id,
    channelName: message.channel.name,
  });

  iData.save()
  .then(item => {
    console.log('1New infraction from "' + moder.displayName + '" added to database');
  })
  .catch(err => {
    console.log("Error: " + err);
  });

  let moder = message.member;
  var user_obj = Moderation.findOne({
    moderID: moder.id
  }, function (err, foundObj) {
    if (err)
      console.log("Error on database findOne: " + err);
    else {
      if (foundObj === null){
        var myData = new Moderation({
					moder: moder.displayName,
					moderID: moder.id,
          infractionsAmount: 0,
          warnsAmount: 0,
          muteAmount: 1,
          voicemuteAmount: 0,
        });
        myData.save()
        .then(item => {
          console.log('New infraction from "' + moder.displayName + '" added to database');
        })
        .catch(err => {
          console.log("Error on database save: " + err);
        });
      } else {
        if (!foundObj)
          return console.log("Something stange happend");

        foundObj.muteAmount = foundObj.muteAmount + 1;
        foundObj.save(function(err, updatedObj){
          if(err)
            console.log(err);
          else{
            console.log('New infraction from "' + moder.displayName + '" added to database')
          }
        });
      }
    }
  });
}

module.exports.help = {
  name: "tempmute"
}
