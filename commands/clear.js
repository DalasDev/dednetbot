
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let number = args[0];

  //лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
  // if(!message.member.hasPermission("MANAGE_MESSAGES"))
  //   return;

  message.delete().catch(O_o=>{});

  if(!message.member.hasPermission("MANAGE_ROLES","ADMINISTRATOR"))
    return message.reply("похоже у тебя недостаточно на это прав, дружище :thinking:.");
  if(!args[0])
    return message.channel.send("Ты не написал сколько сообщений удалить!");
  if(isNaN(args[0])){
    return message.channel.send(`Укажи количестко сообщений для удаления!`);
  }
  if(number < 2 || number > 99){
    return message.channel.send(`Укажи число в пределах от 2 до 99`);
  }
  number = number + 1;
  message.channel.bulkDelete(number).then(() => {
  message.channel.send(`Удалено ${args[0]} сообщений. :ok_hand:`).then(msg => msg.delete(2000));
});

}

module.exports.help = {
  name: "clear"
}
