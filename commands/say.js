const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.permissions.has("MANAGE_CHANNELS")) return;
  if (!message.guild) return;

  message.delete().catch(() => {});

  try {
    const json = JSON.parse(args.join(" "));
    const { plainText } = json;

    if (typeof json.image === "string") json.image = { url: json.image };
    if (typeof json.thumbnail === "string") {
      json.thumbnail = { url: json.thumbnail };
    }

    message.channel.send(json);
  } catch (e) {
    let embed = new MessageEmbed()
      .setDescription(
        `Ошибка отправки сообщения: ${String(
          e
        )}\n\n[Сайт для составления ембеда](https://discord.club/embedg/)`
      )
      .setColor("#f00")
      .setFooter(
        message.member.displayName,
        message.author.displayAvatarURL({ dynamic: true })
      );
    message.channel
      .send({
        embed: embed,
      })
      .catch(() => {});
  }
};

/*

{footer: <"Текст снизу">[, "ссылка на картинку"]}
{image: <ссылка на картинку>}
{thumbnail: <ссылка на картинку>}
{author: <"Текст сверху">[, "ссылка на картинку"]}
{title: <Заголовок>}
{url: <Ссылка для заголовка>}
{description: <Описание>}
{color: <цвет>}
{timestamp[: время в мс]}
{field: <"Заголовок блока", "Описание блока">[, inline]}

{footer: <"Текст снизу">[, "ссылка на картинку"]}\n{image: <ссылка на картинку>}\n{thumbnail: <ссылка на картинку>}\n{author: <"Текст сверху">[, "ссылка на картинку"]}\n{title: <Заголовок>}\n{url: <Ссылка для заголовка>}\n{description: <Описание>}\n{color: <цвет>}\n{timestamp[: время в мс]}\n{field: <"Заголовок блока", "Описание блока">[, inline]}

*/

module.exports.help = {
  name: "say",
};
