const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

//tempmute @member Time

module.exports.run = async (bot, message, args) => {
  
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  let reason = args.join(" ").slice(22);
  let muterole = message.guild.roles.find(`name`, "Наручники (Мут чата)");
  let mutetime = "";
  var warnchannel = message.guild.channels.find('name', "reports");

  if(!message.member.hasPermission("MOVE_MEMBERS"))
    return message.reply("Погоди-ка, у тебя нехватка прав :eyes:");
  if(!wUser)
    return message.reply("Пользователь не существует :thinking: ");
  if(wUser.hasPermission("MANAGE_MESSAGES"))
    return message.reply("не, этого дядьку заварнить не получится :thinking: ");
  if(!muterole)
    return errorschannel.send("Роль для нарушителей не найдена!");
  if(!warnchannel)
    return message.reply("Добавьте, пожулайста, канал для отчетов с названием reports :thinking: ")

  if(!warns[wUser.id])
    warns[wUser.id] = {
      warns: 0
    }

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
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
    message.channel.send(wUser.tag + " получил свое первое предупреждение! Не нарушай больше!");
  }

  if(warns[wUser.id].warns == 2){
    mutetime = "5m";
    await(wUser.addRole(muterole.id));
    message.channel.send(wUser.tag + " посидит " + mutetime + ",  подумает...");

    setTimeout(function(){
      wUser.removeRole(muterole.id);
      warnchannel.reply(`${wUser.tag} был автоматически размучен!`);
    }, ms(mutetime));
  }

  if(warns[wUser.id].warns == 3){
    mutetime = "15m";
    await(wUser.addRole(muterole.id));
    message.channel.send(wUser.tag + " посидит " + mutetime + ",  подумает...");

    setTimeout(function(){
      wUser.removeRole(muterole.id);
      warnchannel.reply(`${wUser.tag} был автоматически размучен!`);
    }, ms(mutetime));
  }

  if(warns[wUser.id].warns == 4){
    mutetime = "30m";
    await(wUser.addRole(muterole.id));
    message.channel.send(wUser.tag + " посидит " + mutetime + ",  подумает...");

    setTimeout(function(){
      wUser.removeRole(muterole.id);
      warnchannel.reply(`${wUser.tag} был автоматически размучен!`);
    }, ms(mutetime));
  }

  if(warns[wUser.id].warns == 5){
    mutetime = "1h";
    await(wUser.addRole(muterole.id));
    message.channel.send(wUser.tag + " посидит " + mutetime + ",  подумает...");

    setTimeout(function(){
      wUser.removeRole(muterole.id);
      warnchannel.reply(`${wUser.tag} был автоматически размучен!`);
    }, ms(mutetime));
  }
}

module.exports.help = {
  name: "warn"
}
