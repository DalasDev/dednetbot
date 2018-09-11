const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');

module.exports.run = async (bot, message) => {

	var user_obj = User.findOne({
		userID: message.member.id 
	}, function (err, res) {
		if (err)
			console.log("Error on database findOne: " + err);
		else {
			if (res === null){
				var myData = new User({
					userID: message.member.id,
					displayName: message.member.displayName,
					highestRole: message.member.highestRole.name,
					joinedAt: message.member.joinedAt,
					messages: 1,
					infractions: 0,
					retrocoins: 0,
				});
				myData.save()
				.then(item => {
					console.log("New user " + message.member.displayName + " added to database");
				})
				.catch(err => {
					console.log("Error on database save: " + err);
				});
			}
			else{
				//messages++;
			}
		}
	});
}

module.exports.help = {
	name: "scanuser"
}