const Discord = require("discord.js");
const ms = require("ms");

//tempmute @member Time

module.exports.run = async (bot, message, args) => {

  let tounmute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let muterole = message.guild.roles.find(`name`, "Наручники (Мут чата)");
  let repchannel = message.guild.channels.find(`name`, "reports");
  let errorschannel = message.guild.channels.find(`name`, "errors");

  if(!tounmute)
    return message.reply("Пользователь не существует!");

  if(!muterole)
    return errorschannel.send("Роль мута не найдена!");

  if(!errorschannel)
    return message.reply("Каналы ошибок не существует!");

  if(!repchannel)
    return errorschannel.send("Канал отчетов не существует!");

<<<<<<< HEAD

  if(!tounmute.roles.has(muterole.id))
=======
  console.log("ToMuteObject 1: " + tomute);

  console.log("ToMuteObject 2: " + JSON.stringify(tomute));

  if(!tomute.roles.has(muterole.id))
>>>>>>> 9714ceb42d638dc2a1c79d675f6e2b54dbd6ee3e
    return message.reply("Пользователь не замучен!");


  await(tounmute.removeRole(muterole.id));

  message.channel.send(`Есть, капитан! <@${tounmute.id}> теперь свободен, как птичка в небе! :ok_hand: `);

}

module.exports.help = {
  name: "unmute"
}