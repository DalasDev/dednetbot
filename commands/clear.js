
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_ROLES"))
    return message.reply("похоже у тебя недостаточно на это прав, дружище :thinking:.");
  if(!args[0])
    return message.channel.send("Ты не написал сколько сообщений удалить!");
  if(isNaN(args[0])){
    message.channel.send(`Укажи число а не какую-то хрень!`).then(msg => msg.delete(4000));
  }
  // if(args[0] < 2 || args[0] > 100){
  //   message.channel.send(`укажи число в пределах от 2 до 100`).then(msg => msg.delete(4000));
  // }
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`Удалено ${args[0]} сообщений. :ok_hand:`).then(msg => msg.delete(4000));
});

}

module.exports.help = {
  name: "clear"
}
