const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/report_model.js');

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports.run = async (bot, message, args) => {

  if(!message.member.roles.some(r=>["Тех. Администратор", "Тех. Стажёр"].includes(r.name)))
		return;

	let toScan = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

	// if(toScan && toScan.roles.some(r=>["Бездушные"].includes(r.name)))
	// 	return;

	//if(!toScan){
		//var user_obj = User.findOne({
			//userID: message.member.id
		//}, function (err, foundObj) {
			//if (err)
				//console.log("Error on database findOne: " + err);
			//else {
				if (!UserObj){
					console.log("User not found in database");
					return;
				}
		 	else {
        var avatar = toScan.user.avatarURL;
				const embed = new Discord.RichEmbed()
				.setTitle(`<@${toScan.id}>`)
				.setColor("#0000FF")
				.addField(`Выдал ${warnsAmount} варнов`)
				.addField(`Выдал ${infractionsAmount} предупреждений`)
				.setThumbnail(avatar)

				message.channel.send({embed});

		var user_obj = User.findOne({
			moderID: toScan.id
		}, function (err, UserObj) {
			if (err)
				console.log("Error on database findOne: " + err);
			}
		});
  }

module.exports.help = {
	name: "police"
}
