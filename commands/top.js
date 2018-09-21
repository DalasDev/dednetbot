const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_ROLES"))
    return;
  console.log("DB");
  var topusers = User.find().sort({retrocoinTotal: -1}).limit(3);
  var topusersArray = topusers.toArray();
  var user1 = topusersArray[0];
  var user2 = topusersArray[1];
  var user3 = topusersArray[2];
  console.log("db");
  console.log("Users: \n"user1 + "\n" + user2 + "\n" + user3);
}

module.exports.help = {
  name: "top"
}
