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

function buyitem(user, item, message){

	var newCash = user.retrocoinCash - item.itemPrice;
	var user_obj = User.findOne({userID: message.member.id}, function(err, found_user){
		if (err)
			console.log("WTF there is an error: " + err);
		else {
			if (!user_obj)
				console.log("User not found");
			else {
				var itemName = item.itemName;
				var newInv = {
					itemName : 1
				};
				found_user.retrocoinCash = newCash;
				found_user.inv = newInv;
				found_user.save(function(err, updatedObj){
				if (err)
					console.log(err);
				});
			}
		}
	});
	return message.reply("держи, вот тебе " + item.itemName);
}

module.exports.run = async (bot, message, args) => {

	//message.delete().catch(O_o=>{});

	//ищю есть ли человек, который пытается что либо купить, у нас в базе
	var user_obj = await User.findOne({userID: message.member.id}, function(err, found_user){});

	if (typeof user_obj === 'undefined' || user_obj === null)
		return message.reply("пользователь не найден в базе");

	console.log(user_obj.displayName + " пытается что-то купить");

	//парсю что человек пытается купить
	var item = message.content.split(" ").toString();
	var to_cut = item.indexOf(",");
	item = item.slice(to_cut + 1);
	item = item.replace(/,/g, " ");
	item = item.replace(/\s\s+/g, ' ');

	//ищем этот итем у нас в базе, узнаем цену
	var item_obj = await Item.findOne({itemName: item}, function(err, found_item){});

	if (typeof item_obj === 'undefined' || item_obj === null)
		return message.reply("укажите точное название из магазина");

	console.log(user_obj.displayName + " пытается купить " + item_obj.itemName);

	//проверяю может ли юзер купить то, что задумал
	if (user_obj.retrocoinCash - item_obj.itemPrice >= 0){
		buyitem(user_obj, item_obj, message);
	}
	else{
		return message.reply("у тебя не хватит на " + item_obj.itemName);
	}
}

module.exports.help = {
	name: "buy"
}
