
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let mainchannel = message.guild.channels.find(`name`, "💬общение");
  const sayMessage = args.join(" ");
  message.delete().catch(O_o=>{});
  //лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return;
  if(!message.member.roles.some(r=>["Тех. Администратор", "Губернатор", "Стример"].includes(r.name)))
    return;

  message.delete().catch();
  mainchannel.send(sayMessage);
}

module.exports.help = {
  name: "say"
}
