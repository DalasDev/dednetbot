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
		
		var user_obj = User.findOne({userID: message.member.id}).lean().exec(function(err, user) {
			if(err)
				console.log(err);
			else{
				var itemToBuy = Item.findOne({itemName: args[0]}).lean().exec(function(err, item) {
					if(err)
						console.log(err);
					else{
						console.log("User " + user.displayName + " want's to buy a " + item.itemName);
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