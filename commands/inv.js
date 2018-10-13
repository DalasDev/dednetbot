const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');

const numberWithCommas = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function sort_inv(inv) {
	var a = [], b = [], prev;

	inv.sort();
	for ( var i = 0; i < inv.length; i++ ) {
		if ( inv[i] !== prev ) {
			a.push(inv[i]);
			b.push(1);
		} else {
			b[b.length-1]++;
		}
		prev = inv[i];
	}
	return [a, b];
}

module.exports.run = async (bot, message, args) => {

	var retricIcon = bot.emojis.find("name", "retric");

	let toScan = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

	if (toScan)
		return message.reply("в чужой карман заглянуть нельзя!");

	if(!toScan){

		var user_obj = await User.findOne({userID: message.member.id}, function(err, found_user){});

		if (typeof user_obj === 'undefined' || user_obj === null)
			return message.reply("пользователь не найден в базе");

		var inventory_magic = sort_inv(user_obj.inv);
		var	inventoryNames = inventory_magic[0];
		var inventoryCount = inventory_magic[1];

		var maxX = inventoryNames.length;
		var x = 0;
		var y = 0;
		var text = ``;

		while(x < maxX)
			text += `**${y=x+1}.** ${inventoryNames[x]} • **${numberWithCommas(inventoryCount[x++])}**\n`;

		var min = 0;
		var max = 16777215;
		var randomColor = Math.floor(Math.random() * (max - min + 1)) + min;

		message.channel.send({embed: {
			color: randomColor,
			title: `**${user_obj.displayName}** :zap: **инвентарь**`,
			fields: [
			{
				name: "(все что ты успел у нас закупить)",
				value: text
			}
			],
			timestamp: new Date(),
			footer: {
				icon_url: message.author.avatarURL,
				text: `© ${message.member.displayName}`
			},
		}});
	} else {
		console.log("WTF?!");
		// var user_obj = User.findOne({
		// 	userID: toScan.id
		// }, function (err, foundObj) {
		// 	if (err)
		// 		console.log("Error on database findOne: " + err);
		// 	else {
		// 		var avatar = toScan.user.avatarURL;
		// 		var total = foundObj.retrocoinCash + foundObj.retrocoinBank;
		// 		const embed = new Discord.RichEmbed()
		// 		.setTitle("Личный счет " + toScan.displayName)
		// 		.setColor("#0000FF")
		// 		.addField("Наличкой", `${numberWithCommas(foundObj.retrocoinCash)} ${retricIcon}`, true)
		// 		.addField("В банке", `${numberWithCommas(foundObj.retrocoinBank)} ${retricIcon}`, true)
		// 		.setThumbnail(avatar)

		// 		message.channel.send({embed});
		// 	}
		// });
	}
}


module.exports.help = {
	name: "inv"
}
