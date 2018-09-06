
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.delete().catch(O_o=>{});
  if(!message.member.hasPermission("MANAGE_ROLES"))
    return message.reply("похоже у тебя недостаточно на это прав, дружище :thinking:.");
  if(!args[0])
    return message.channel.send("Ты не написал сколько сообщений удалить!");
  if(isNaN(args[0])){
    message.channel.send(`Укажи количестко сообщений для удаления`);
  }
  let number = args[0];
  if(number < 2 || number > 100){
    message.channel.send(`Укажи число в пределах от 2 до 100`);
  }
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`Удалено ${args[0]} сообщений. :ok_hand:`).then(msg => msg.delete(4000));
});

}

module.exports.help = {
  name: "clear"
}
