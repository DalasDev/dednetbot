const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let x = 0;
  message.guild.members.cache
    .filter((x) => x.roles.cache.has("649071264077578270"))
    .forEach((m) => {
      setTimeout(() => {
        message.member.send({
            "embed": {
                "color": 3553598,
                "title": "Любишь поиграть в GTA 5?",
                "description": "**Это не спам!** \n\nЯ лишь хочу пригласить тебя на открытие крутого **RolePlay** проекта по **Grand Theft Auto 5**. Там ты можешь стать кем захочешь: борись за справедливость, грабь банки, угоняй тачки – все это ждет тебя на **Alamo RolePlay: MilkyWay**! Уникальный системы взаимодействий, кастомизация персонажа и многое другое. Тут действия ограничиваются лишь твоей фантазией.\n\nДля того, чтобы поиграть на проекте, качай клиент по [этой ссылке](https://fivem.net) и следовать инструкции в дискорд сервере Alamo RolePlay.\n\nУчаствуй в конкурсе приглашений, бюджет которого **10000 рублей**! Получи промо-код для быстрого старта и стань частью игрового мира **Alamo MilkyWay**! \n\n**Ссылка на сервер с инструкцией:** https://discord.gg/uGPCP994FR\n\n\n\n\n",
                "image": {
                    "url": "https://media.discordapp.net/attachments/586866005851111424/782258397915119616/alamo_rp.png?width=1442&height=541"
                }
            }
        }).catch((e) =>
          console.log(e)
        );
      }, x);
      x = x + 5000;
    });
}

module.exports.help = {
  name: "pizdaxuy"
}
