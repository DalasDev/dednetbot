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

module.exports.run = async (bot, message, args) => {

	if (isNumeric(args[1]) && !args[2] && Number(args[1]) >= 1) {
		
		var user_obj = User.findOneAndUpdate({userID: message.member.id}).lean().exec(function(err, user) {
			if(err)
				console.log(err);
			else{
				if (!user)
					return message.reply("юзер не найден");
				var itemToBuy = Item.findOne({itemName: args[0]}).lean().exec(function(err, item) {
					if(err)
						console.log(err);
					else{
						if(!item)
							return message.reply("итем не найден");
						if (user.retrocoinCash - item.itemPrice < 0)
							return message.reply("не достаточно налички для покупки");
						user.retrocoinCash = user.retrocoinCash - item.itemPrice;
						var newItem = new Object({itemName: item.itemName});
						console.log("DB");
						console.log("newItem: " + newItem);
						user.inv.push(newItem);
					}
				});
			}
		});
	}
	else
		return message.reply("чеееее :thinking:");
}

module.exports.help = {
	name: "buy"
}