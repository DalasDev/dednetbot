const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');

module.exports.run = async (bot, message, args) => {

	var myData = new User({
		userID: message.member.id,
		displayName: message.member.displayName,
		highestRole: message.member.highestRole.name,
		joinedAt: message.member.joinedAt,
		messages: 1;
		infractions: 0,
		retrocoins: 0,
	});

	myData.save()
	.then(item => {
		console.log("New user added!");
	})
	.catch(err => {
		console.log("Error: " + err);
	});
}

module.exports.help = {
	name: "scanuser"
}