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
  var topusers = User.find().sort({retrocoinTotal: -1}).limit(3).lean().exec(function(err, doc) {
    if(err)
      console.log(err);
    else{
      console.log("1ST: " + doc[0].displayName);
      console.log("2ND: " + doc[1].displayName);
    }
  });
}

module.exports.help = {
  name: "top"
}
