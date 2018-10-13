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

	message.delete().catch(O_o=>{});

	// User.findOne({userID: message.member.id}).lean().exec(function(err, user) {
	// 	console.log("USER : " + user);
	// });
	var test = await User.findOne({userID: message.member.id}, function(err, found_user){
		console.log("User total money is: " + found_user.retrocoinTotal);
		var test2 = found_user.retrocoinTotal;
		console.log("test2 inside the func is : " + test2);
	});

	console.log("test is : " + test);
	console.log("test2 is : " + test2);
	console.log("test.displayName is : " + test.displayName);
}

module.exports.help = {
	name: "buy"
}
