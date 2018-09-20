const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("Похоже у тебя недостаточно на это прав, дружище :thinking:.");

  let iUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!iUser)
    return message.reply("пользователь не найден / не указан!");

  let avatar = iUser.user.avatarURL;
  
  const embed = new Discord.RichEmbed()
  .setTitle("ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ")
  .setColor("#4C8BF5")
  .setThumbnail(avatar)
  .addField("Ник пользователя:", `${iUser}`, true)
  .addField("ID пользователя:", `${iUser.id}`, true)
  .addField("Присоединился:", `${iUser.joinedAt}`, true)
  .addField("Зарегистрировался:", iUser.user.createdAt, true)

  message.channel.send({embed});

  //   message.channel.send({embed: {
  //     color: 3447003,
  //     author: {
  //       name: bot.user.username,
  //       icon_url: bot.user.avatarURL
  //     },
  //     title: "Пример юзер инфо",
  //     description: "(что то о пользевателе)",
  //     fields: [{
  //       name: "Никнейм",
  //       value: "(тут может быть никнейм)"
  //     },
  //     {
  //       name: "Нарушения",
  //       value: "(тут может быть[ссылка](http://www.retro-bot.com) на нарушения прользователя)"
  //     },
  //     {
  //       name: "Тест статы",
  //       value: "```тест:test\nтест2:test2```"
  //     },
  //     {
  //       name: "Разметка",
  //       value: "*Разметка* **__Разметка__**"
  //     }
  //     ],
  //     timestamp: new Date(),
  //     footer: {
  //       icon_url: bot.user.avatarURL,
  //       text: "© Example"
  //     }
  //   }
  // });
}

module.exports.help = {
  name: "userinfo"
}
