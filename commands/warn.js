const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

//tempmute @member Time

module.exports.run = async (bot, message, args) => {

  console.log("DB1");
  
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  let reason = args.join(" ").slice(22);
  let muterole = message.guild.roles.find(`name`, "Наручники (Мут чата)");
  let mutetime = "";

  if(!message.member.hasPermission("MOVE_MEMBERS"))
    return message.reply("Погоди-ка, у тебя нехватка прав :eyes:");
  if(!wUser)
    return message.reply("Пользователь не существует :thinking: ");
  if(wUser.hasPermission("MANAGE_MESSAGES"))
    return message.reply("не, этого дядьку заварнить не получится :thinking: ");
  if(!muterole)
    return errorschannel.send("Роль для нарушителей не найдена!");

  console.log("DB2");

  if(!warns[wUser.id])
    warns[wUser.id] = {
      warns: 0
    }

    warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
      if (err)
        console.log(err);
    });

    console.log("DB3");

    let warnEmbed = new Discord.RichEmbed()
    .setDescription("Отчет о варне")
    .setAuthor(message.author.username)
    .setColor("#fc6400")
    .addField("Жертва", wUser.tag)
    .addField("Предупреждение выдано в", message.channel)
    .addField("Предупреждений у нарушителя", warns[wUser.id].warns)
    .addField("Причина", reason);

    let warnchannel = message.guild.channels.find('name', "reports");

    console.log("DB4");

    if(!warnchannel)
      return message.reply("Добавьте, пожулайста, канал для отчетов с названием reports :thinking: ")

    warnchannel.send(warnEmbed);

    console.log("DB5");

    if(warns[wUser.id].warns == 2){
      mutetime = "5m";
      await(wUser.addRole(muterole.id));
      message.channel.send(`${wUser.tag} посидит ${mutetime}, подумает...`);

      setTimeout(function(){
        wUser.removeRole(muterole.id);
        warnchannel.reply(`${wUser.tag} был автоматически размучен!`);
      }, ms(mutetime));
    }

    if(warns[wUser.id].warns == 3){
      mutetime = "15m";
      await(wUser.addRole(muterole.id));
      message.channel.send(`${wUser.tag} посидит ${mutetime}, подумает...`);

      setTimeout(function(){
        wUser.removeRole(muterole.id);
        warnchannel.reply(`${wUser.tag} был автоматически размучен!`);
      }, ms(mutetime));
    }

    if(warns[wUser.id].warns == 4){
      mutetime = "30m";
      await(wUser.addRole(muterole.id));
      message.channel.send(`${wUser.tag} посидит ${mutetime}, подумает...`);

      setTimeout(function(){
        wUser.removeRole(muterole.id);
        warnchannel.reply(`${wUser.tag} был автоматически размучен!`);
      }, ms(mutetime));
    }

    if(warns[wUser.id].warns == 5){
      mutetime = "1h";
      await(wUser.addRole(muterole.id));
      message.channel.send(`${wUser.tag} посидит ${mutetime}, подумает...`);

      setTimeout(function(){
        wUser.removeRole(muterole.id);
        warnchannel.reply(`${wUser.tag} был автоматически размучен!`);
      }, ms(mutetime));
    }

    console.log("DB6");

}

module.exports.help = {
  name: "warn"
}
