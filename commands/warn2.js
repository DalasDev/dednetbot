const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var warnUser = require('./../schemas/warn_model.js');

//warn2 (Mee6 warns)

module.exports.run = async (bot, message, args) => {

  let reason = "";
  reason = args.join(" ").slice(22);
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  let muterole = message.guild.roles.find(`name`, "Наручники (Мут чата)");
  let mutetime = "";
  let warnchannel = message.guild.channels.find(`name`, "🌘reports_bots");
  let errorschannel = message.guild.channels.find(`name`, "🌏errors_bots");

  let sicon = message.guild.iconURL;

  const embed = new Discord.RichEmbed()
  .setTitle(":star: Отчет о варне (подслушка с Бибо) :star:")
  .setColor("#fc6400")
  .addField("Нарушитель", `<@${wUser.id}>`, true)
  .addField("Предупреждение выдано в", message.channel, true)
  .addField("Предупреждение выдал", message.member, true)
  .addField("Причина", reason, true);

  if(warnchannel){
    warnchannel.send({embed});
  } else {
    console.log("No warnchannel defined");
  }

  //mongoose add

  var myData = new warnUser({
    userID: wUser.id,
    userNickname: wUser.displayName,
    warnedFor: reason,
    warnedBy: message.member.id,
    warnerNickname: message.member.displayName,
    when: Date.now(),
    channelID: message.channel.id,
    channelName: message.channel.name,
    warnedVia: "MEE6"
  });

  myData.save()
  .then(item => {
  })
  .catch(err => {
    console.log("Error: " + err);
  });

  let moder = message.member;
  var User = require('./../schemas/report_model.js');
  var user_obj = User.findOne({
  	moderID: moder.id
  }, function (err, foundObj) {
  	if (err)
  		console.log("Error on database findOne: " + err);
  	else {
  		if (foundObj === null){
  			var myData = new User({
  				moder: moder.username,
  				moderID: moder.id,
          infractionsAmount: 0,
          warnsAmount: 1,
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

        foundObj.warnsAmount = foundObj.warnsAmount + 1;

  			}
  		}
  	});

  //end of mongoose

}

module.exports.help = {
  name: "warn2"
}
