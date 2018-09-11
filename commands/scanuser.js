const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');

module.exports.run = async (bot, message) => {

	var user_obj = User.findOne({
		userID: message.member.id 
	}, function (err, foundObj) {
		if (err)
			console.log("Error on database findOne: " + err);
		else {
			if (foundObj === null){
				var myData = new User({
					userID: message.member.id,
					displayName: message.member.displayName,
					highestRole: message.member.highestRole.name,
					joinedAt: message.member.joinedAt,
					messages: 1,
					infractions: 0,
					retrocoins: 0,
					lastScan: Date.now()
				});
				myData.save()
				.then(item => {
					console.log('New user "' + message.member.displayName + '" added to database');
				})
				.catch(err => {
					console.log("Error on database save: " + err);
				});
			}
			else {
				if (!foundObj)
					console.log("Something stange happend");
				else {
					var dateTime = Date.now();
					var timestamp = Math.floor(dateTime/1000);
					var timestampLimit = Math.floor(foundObj.lastScan/1000) + 300;
					if(timestampLimit < timestamp) {
						var min = 1;
						var max = 15;
						var coinrandom = Math.floor(Math.random() * (max - min + 1)) + min;
						foundObj.messages++;
						foundObj.retrocoins += coinrandom;
						foundObj.save(function(err, updatedObj){
							if(err)
								console.log(err);
						})
					}
					else{
						console.log("writing to often, not counting this");
					}
				}
			}
		}
	});
}

module.exports.help = {
	name: "scanuser"
}