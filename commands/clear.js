
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Похоже у тебя недостаточно на это прав, дружище :thinking:.");
  if(!args[0]) return message.channel.send("Ты не написал сколько сообщений удалить!");
  if(isNaN(args[0])){
    message.channel.send("Укажи число а не что попало!");
  }
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`Удалено ${args[0]} сообщений. :ok_hand:`).then(msg => msg.delete(4000));
});

}

module.exports.help = {
  name: "clear"
}
