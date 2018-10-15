const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.delete().catch(O_o=>{});

  var hmmIcon = bot.emojis.find("name", "hmm");

  if(!message.member.roles.some(r=>["РетроТестер", "Тех. Администратор", "Губернатор", "⭐Полицейский⭐", "⭐Шерифский департамент⭐", "Городской супергерой ⚡"].includes(r.name)))
    return;

  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!user)
  	return;
  let cnchannel = message.guild.channels.find(`name`, "👥черный_рынок");
  let pchannel = message.guild.channels.find(`name`, "📌правила");

  message.channel.send(`${user}, продавать, отдавать или покупать что либо можно только в чате ${cnchannel}! И прочти пожалуйста ${pchannel} ${hmmIcon}`);

  let moder = message.member;
  var User = require('./schemas/report_model.js');
  var user_obj = User.findOne({
		userID: moder.id
	}, function (err, foundObj) {
		if (err)
			console.log("Error on database findOne: " + err);
		else {
			if (foundObj === null){
				var myData = new User({
					moder: moder.username,
					moderID: moder.id,
          infractionsAmount: 1,
          warnsAmount: 0,
				});
				myData.save()
				.then(item => {
					console.log('New infraction from "' + moder.username + '" added to database');
				})
				.catch(err => {
					console.log("Error on database save: " + err);
				});
			} else {
				if (!foundObj)
					return console.log("Something stange happend");

        foundObj.infractionsAmount = foundObj.infractionsAmount + 1;

				}
			}
		});
}

module.exports.help = {
	name: "4r"
}
