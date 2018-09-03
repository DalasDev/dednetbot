const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

//tempmute @member Time

module.exports.run = async (bot, message, args) => {
  
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  let reason = args.join(" ").slice(22);

  if(!message.member.hasPermissions("MANAGE_MEMBERS"))
    return message.reply("Погоди-ка, у тебя нехватка прав :eyes:");
  if(!wUser)
    return message.reply("Пользователь не существует :thinking: ");
  if(wUser.hasPermissions("MANAGE_MESSAGES"))
    return message.reply("Не, этого дядьку заварнить не получится :thinking: ")

  if(!warns[wUser.id])
    warns[wUser.id] = {
      warns: 0
    }

    warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns) (err) => {
      if (err)
        console.log(err);
    });
}

module.exports.help = {
  name: "warn"
}
