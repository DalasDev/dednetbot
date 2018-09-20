const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_ROLES"))
    return;

  let iUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!iUser)
    return message.reply("пользователь не найден / не указан!");

  var retricIcon = bot.emojis.find("name", "retric");
  var hmmIcon = bot.emojis.find("name", "hmm");

  message.channel.send({embed: {
    color: 3447003,
    icon_url: message.guild.iconURL,
    title: `***Retro Valley*** :zap: ${iUser.displayName}`,
    description: `(**высшая роль:** ${iUser.highestRole.name})`,
    fields: [
    {
      name: `***Личный статус*** :speech_left:`,
      value: `__не установлен__`
    },
    {
      name: `***Личный баланс :*** ${retricIcon}`,
      value: `***Нарушений :*** овер миллион`
    },
    {
      name: "```:red_circle: закрыто\n:red_circle: закрыто\n:red_circle: закрыто\n:red_circle: закрыто\n:red_circle: закрыто\n```:red_circle: закрыто\n",
      value: "```Обнят(а) : 0\nПоцелован(а) : 0\nТрахнут(а) : 0\nПобит(а) : 0\nЗапой : 0\nУбит(а) : 0```"
    }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: message.author.avatarURL,
      text: `© ${message.member.displayName}`
    },
    thumbnail: {
      url: `${iUser.user.avatarURL}`
    }
  }
});
}

module.exports.help = {
  name: "userinfo"
}
