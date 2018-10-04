const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');


function isNumeric(value) {
	return /^\d+$/.test(value);
}

function random(min, max) {
	var result = Math.floor(Math.random() * (max - min + 1)) + min;
	return (result);
}

module.exports.run = async (bot, message, args) => {

  if(!message.member.roles.some(r=>["Тех. Администратор", "Губернатор"].includes(r.name)))
    return message.reply("похоже у тебя нехватка прав!");

	var retricIcon = bot.emojis.find("name", "retric");
	var simpleIcon = bot.emojis.find("name", "this_is_simple");
  let muser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!muser){
    return message.reply("пользователь не найден / не существует!");
  }
  let plase = args[1];
  let amountin = args[2];
  if(isNaN(amountin)){
    return message.reply("введите число!");
  }
  let amount = Number(amountin);

	var user_obj = User.findOne({
		userID: muser.id
	}, function (err, foundObj) {
		if (err){
			console.log("Error on database findOne: " + err);
		}
		else {
			if (!foundObj)
				console.log("Something stange happend");
			else {

				if(plase == "bank"){
          foundObj.retrocoinBank = foundObj.retrocoinBank + amount;
          if(amount<0){
            message.reply(`пользователю <@${muser.id}> отнято ${amount}${retricIcon} из банка!`);
          }else{
            message.reply(`пользователю <@${muser.id}> добавлено ${amount}${retricIcon} в банк!`);
          }
        }else if(plase == "cash"){
          foundObj.retrocoinCash = foundObj.retrocoinCash + amount;
          if(amount<0){
            message.reply(`пользователю <@${muser.id}> отнято ${amount}${retricIcon} из кармана!`);
          }else{
            message.reply(`пользователю <@${muser.id}> добавлено ${amount}${retricIcon} из банка!`);
          }
        }else{
          return message.reply(`параметры не верны (^editmoney <пользователь> <bank/cash> <количество>)! Вы можете так же отнять деньги у пользователя написав перед числом "-"`);
        }

				foundObj.save(function(err, updatedObj){
				if(err)
					console.log(err);
				});
			}
		}
	});
}

module.exports.help = {
	name: "editmoney"
}
