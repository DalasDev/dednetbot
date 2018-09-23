const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.channel.send('Занятся сексом? 30 сек')
  .then(() => {
    message.channel.awaitMessages(response => response.content === 'да', {
      max: 3,
      time: 30000,
      errors: ['time'],
    })
    .then((collected) => {
      message.channel.send(`Найдено: ${collected.first().content}`);
    })
    .catch(() => {
      message.channel.send('Видимо, это отказ');
    });
  });

}

module.exports.help = {
  name: "test"
}