const Discord = require("discord.js");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");

module.exports.run = async (bot, message, args) => {

  message.delete().catch(O_o=>{});

  var hmmIcon = bot.emojis.find("name", "hmm");

  if(!message.member.roles.some(r=>["Тех. Администратор", "Губернатор", "⭐Полицейский⭐", "⭐Шерифский департамент⭐", "Городской супергерой ⚡"].includes(r.name)))
    return;

  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!user)
  	return;
  if(user == message.member)
    return message.reply("эйй... Не нужно себя варнить!")
  if(user.hasPermission("MANAGE_MESSAGES"))
    return message.reply("не, этого дядьку заварнить не получится!");

  let cnchannel = message.guild.channels.find(`name`, "👥черный_рынок");
  let pchannel = message.guild.channels.find(`name`, "📌правила");
  let kchannel = message.guild.channels.find(`name`, "📵канализация");
  let pnchannel = message.guild.channels.find(`name`, "👋поиск_напарников");

  message.channel.send(`${user}, продавать, отдавать или покупать что либо можно только в чате ${cnchannel}! И прочти пожалуйста ${pchannel} ${hmmIcon}`);

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
					moder: moder.displayName,
					moderID: moder.id,
          infractionsAmount: 1,
          warnsAmount: 0,
          muteAmount: 0,
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
	name: "4r"
}
