const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');
var Item = require('./../schemas/shop_model.js');

function isNumeric(value) {
	return /^\d+$/.test(value);
}

function useitem(user, item, message){

	var user_obj = User.findOne({userID: message.member.id}, function(err, found_user){
		if (err)
			console.log("WTF there is an error: " + err);
		else {
			if (!user_obj)
				console.log("User not found");
			else {
				message.reply("ты только что (почти) юзанул " + item.itemName);
				var index = user.inv.indexOf(item.itemName);
				newinv = user.inv;
				newinv.splice(index, 1);
				found_user.inv = newinv;
				found_user.save(function(err, updatedObj){
				if (err)
					console.log(err);
				});
			}
		}
	});
}

module.exports.run = async (bot, message, args) => {

	//message.delete().catch(O_o=>{});

	//ищем есть ли человек, который пытается что либо купить, у нас в базе
	var user_obj = await User.findOne({userID: message.member.id}, function(err, found_user){});

	if (typeof user_obj === 'undefined' || user_obj === null)
		return message.reply("пользователь не найден в базе");

	//парсим что человек пытается юзануть
	var item = message.content.split(" ").toString();
	var to_cut = item.indexOf(",");
	item = item.slice(to_cut + 1);
	item = item.replace(/,/g, " ");
	item = item.replace(/\s\s+/g, ' ');

	//Поиск данной вещи в магазине (для того что бы знать юзабелен ли этот итем)
	var item_obj = await Item.findOne({itemName: item}, function(err, found_item){});

	if (typeof item_obj === 'undefined' || item_obj === null)
		return message.reply("этой вещи больше нету в магазине");

	//ищем есть ли у человека этот итем

	if (user_obj.inv.includes(item) == false)
		return message.reply(`у тебя нету ${item}`);
	else
		useitem(user_obj, item_obj, message);
}

module.exports.help = {
	name: "use"
}