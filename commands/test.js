const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.channel.send('Тест на 30 сек')
  .then(() => {
    message.channel.awaitMessages(response => response.content === 'да', {
      max: 1,
      time: 30000,
      errors: ['time'],
    })
    .then((collected) => {
      message.channel.send(`Найдено: ${collected.first().content}`);
    })
    .catch(() => {
      message.channel.send('Ничего не было указано');
    });
  });

}

module.exports.help = {
  name: "test"
}