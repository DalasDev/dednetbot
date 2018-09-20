const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("Похоже у тебя недостаточно на это прав, дружище :thinking:.");

  let iUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!iUser)
    return message.reply("пользователь не найден / не указан!");

  let avatar = iUser.user.avatarURL;
  var dabIcon = bot.emojis.find("name", "dab");
  var retricIcon = bot.emojis.find("name", "retric");
  var hmmIcon = bot.emojis.find("name", "hmm");
  // const embed = new Discord.RichEmbed()
  // .setTitle("ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ")
  // .setColor("#4C8BF5")
  // .setThumbnail(avatar)
  // .addField("Ник пользователя:", `${iUser}`, true)
  // .addField("ID пользователя:", `${iUser.id}`, true)
  // .addField("Присоединился:", `${iUser.joinedAt}`, true)
  // .addField("Зарегистрировался:", iUser.user.createdAt, true)

  // message.channel.send({embed});

    message.channel.send({embed: {
      color: 3447003,
      image:{
        url: `${iUser.user.avatarURL}`
      }
      author: {
        name: `**Retro Valley** ${dabIcon} ${iUser}`,
        icon_url: message.guild.iconURL
      },
      title: "***Личный статус***",
      description: "__не установлен__",
      fields: [{
        name: `***Личный баланс :*** ${retricIcon}`
      },
      {
        value: "```тест:test\nтест2:test2```"
      }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: message.author.avatarURL,
        text: `© ${message.member.displayName}`
      }
    }
  });
}

module.exports.help = {
  name: "userinfo"
}
