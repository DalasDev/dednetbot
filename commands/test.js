const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.channel.send({embed: {
    color: 3447003,
    author: {
      name: bot.user.username,
      icon_url: bot.user.avatarURL
    },
    title: "Пример юзер инфо",
    description: "(что то о пользевателе)",
    image: "https://retrobotproject.herokuapp.com/images/purpose.gif",
    fields: [{
      name: "Никнейм",
      value: "(тут может быть никнейм)"
    },
    {
      name: "Нарушения",
      value: "(тут может быть[ссылка](http://www.retro-bot.com) на нарушения прользователя)"
    },
    {
      name: "Тест статы",
      value: "```тест:test\nтест2:test2```"
    },
    {
      name: "Разметка",
      value: "*Разметка* **__Разметка__**"
    }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: bot.user.avatarURL,
      text: "© Example"
    }
  }
});

}

module.exports.help = {
  name: "test"
}