const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
let warns = JSON.parse(fs.readFileSync("./public/warnings.json", "utf8"));

mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");

var warnSchema = new mongoose.Schema({
 discordID: String,
 warnedFor: String
});

//tempmute @member Time

module.exports.run = async (bot, message, args) => {

  let reason = "";
  reason = args.join(" ").slice(22);
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  let muterole = message.guild.roles.find(`name`, "Наручники (Мут чата)");
  let mutetime = "";
  let warnchannel = message.guild.channels.find(`name`, "🌘reports_bots");
  let errorschannel = message.guild.channels.find(`name`, "🌏errors_bots");

  //лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return;
  if(reason === "")
    return message.reply("укажите причину!");
  if(!message.member.hasPermission("MOVE_MEMBERS"))
    return message.reply("погоди-ка, у тебя нехватка прав :eyes:");
  if(!wUser)
    return message.reply("пользователь не существует :thinking: ");
  if(wUser.hasPermission("MANAGE_MESSAGES"))
    return message.reply("не, этого дядьку заварнить не получится :thinking: ");
  if(!muterole)
    return errorschannel.send("роль для нарушителей не найдена!");
  if(!errorschannel)
    return message.channel.send("Канал ошибок не существует!");
  if(!warnchannel)
    errorschannel.send("Канал репортов не существует!");
  if(!warnchannel)
    return message.channel.send("Канал репортов не существует!");
  
  if(!warns[wUser.id]){
    warns[wUser.id] = {
      warns: 0
    }
  }

  warns[wUser.id].warns++;

  //mongoose test

  console.log("mongoDB connect");
  var warnUser = mongoose.model("warnUser", warnSchema);
  let id = `<@${wUser.id}>`;
  var myData = new warnUser({
    discordID: id,
    warnedFor: reason
  });
  myData.save()
  .then(item => {
    console.log("Added item: " + item);
  })
  .catch(err => {
    console.log("Error: " + err);
  });

  //end of mongoose test

  fs.writeFile("./public/warnings.json", JSON.stringify(warns), (err) => {
    if (err)
      console.log(err);
  });

  let sicon = message.guild.iconURL;

  const embed = new Discord.RichEmbed()
  .setTitle(":star: Отчет о варне :star:")
  .setColor("#fc6400")
  .addField("Жертва", `<@${wUser.id}>`, true)
  .addField("Предупреждение выдано в", message.channel, true)
  .addField("Предупреждение выдал", message.member, true)
  .addField("Предупреждений у нарушителя", warns[wUser.id].warns, true)
  .addField("Причина", reason, true);

  warnchannel.send({embed});

  if(warns[wUser.id].warns == 1){
    message.channel.send(`<@${wUser.id}>` + " получил свое первое предупреждение! Не нарушай больше!");
  }

  if(warns[wUser.id].warns == 2){
    mutetime = "5m";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}>` + " посидит " + mutetime + ",  подумает...");

    setTimeout(function(){
      if(wUser.roles.has(muterole.id)){
        wUser.removeRole(muterole.id);
        warnchannel.send(`<@${wUser.id}> был автоматически размучен!`);
      }
    }, ms(mutetime));
  }

  if(warns[wUser.id].warns == 3){
    mutetime = "15m";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}>` + " посидит " + mutetime + ",  подумает...");

    setTimeout(function(){
      if(wUser.roles.has(muterole.id)){
        wUser.removeRole(muterole.id);
        warnchannel.send(`<@${wUser.id}> был автоматически размучен!`);
      }
    }, ms(mutetime));
  }

  if(warns[wUser.id].warns == 4){
    mutetime = "30m";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}>` + " посидит " + mutetime + ",  подумает...");

    setTimeout(function(){
      if(wUser.roles.has(muterole.id)){
        wUser.removeRole(muterole.id);
        warnchannel.send(`<@${wUser.id}> был автоматически размучен!`);
      }
    }, ms(mutetime));
  }

  if(warns[wUser.id].warns == 5){
    mutetime = "1h";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}>` + " посидит " + mutetime + ",  подумает...");

    setTimeout(function(){
      if(wUser.roles.has(muterole.id)){
        wUser.removeRole(muterole.id);
        warnchannel.send(`<@${wUser.id}> был автоматически размучен!`);
      }
    }, ms(mutetime));
  }
}

module.exports.help = {
  name: "warn"
}
