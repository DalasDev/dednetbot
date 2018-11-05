const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;mongoose.connect(process.env.MONGO_URL);

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

module.exports.run = async (bot, message, args) => {

  message.delete().catch(O_o=>{});

  const bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  var moder = message.member;

  let repchannel = message.guild.channels.find(`name`, "🌘reports_bots");

  var hmmIcon = bot.emojis.find("name", "hmm");

  if(!message.member.roles.some(r=>["Тех. Администратор", "Губернатор", "⭐Полицейский⭐", "⭐Шерифский департамент⭐", "Городской супергерой ⚡"].includes(r.name)))
    return;

  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!user)
    return;
  if(user == message.member)
    return message.reply("эйй... Не нужно себя варнить!")
  if(user.hasPermission("MANAGE_MESSAGES"))
    return message.reply("нее... Такого человека не заварнишь!");

  let cnchannel = message.guild.channels.find(`name`, "👥черный_рынок");
  let pchannel = message.guild.channels.find(`name`, "📌правила");
  let kchannel = message.guild.channels.find(`name`, "📵канализация");
  let pnchannel = message.guild.channels.find(`name`, "👋поиск_напарников");

  message.channel.send(`${user}, тебе в ${pnchannel}! И прочти пожалуйста ${pchannel} ${hmmIcon}`);

  let embed = new Discord.RichEmbed()
	.setTitle(":zap: ОТЧЕТ О ПРЕДУПРЕЖДЕНИИ :zap:")
	.setColor("#DD5044")
	.addField("Предупреждённый:", `${bUser}`, true)
	.addField("Пользователя предупредил:", `<@${message.author.id}>`, true)
	.addField("Предупрежден в канале:", message.channel, true)
	.addField("Время предупреждения:", message.createdAt, true)
	.addField("Был послан в", pnchannel, true)

  repchannel.send(embed);

  var iData = new Infraction({
    infractionType: "pn",
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
  })
  .catch(err => {
    console.log("Error: " + err);
  });

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
          infractionsAmount: 1,
          warnsAmount: 0,
          muteAmount: 0,
          voicemuteAmount: 0,
				});
				myData.save()
				.then(item => {
				})
				.catch(err => {
					console.log("Error on database save: " + err);
				});
			} else {
				if (!foundObj)
					return console.log("Something stange happend");

        foundObj.infractionsAmount = foundObj.infractionsAmount + 1;
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
  name: "pn"
}
