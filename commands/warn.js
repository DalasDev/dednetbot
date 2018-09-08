const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./public/warnings.json", "utf8"));

//tempmute @member Time

module.exports.run = async (bot, message, args) => {

  let reason = "";
  reason = args.join(" ").slice(22);
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  let muterole = message.guild.roles.find(`name`, "Наручники (Мут чата)");
  let mutetime = "";
  let warnchannel = message.guild.channels.find('name', "reports");

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
  if(!warnchannel)
    return message.reply("добавьте, пожулайста, канал для отчетов с названием reports :thinking: ")

  if(!warns[wUser.id]){
    warns[wUser.id] = {
      warns: 0
    }
  }

  warns[wUser.id].warns++;

  fs.writeFile("./public/warnings.json", JSON.stringify(warns), (err) => {
    if (err)
      console.log(err);
  });

  let sicon = message.guild.iconURL;

  const embed = new Discord.RichEmbed()
  .setTitle(":star: Отчет о варне нахуй :star:")
  .setColor("#fc6400")
  .addField("Жертва", `<@${wUser.id}>`, true)
  .addField("Предупреждение выдано в", message.channel, true)
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
