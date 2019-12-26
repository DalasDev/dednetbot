const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.roles.some(r=>["Discord NPC Developer", "God Father"].includes(r.name)))
    return;

  message.delete().catch(O_o=>{});

  var server = args[1];
  var nickname = args.join(" ").slice(22);
  if(!server)
    return message.reply("Команда введена неверно! Пример: !vf [Имя] [Сервер]");
  if(!nickname)
    return message.reply("Команда введена неверно! Пример: !vf [Имя] [Сервер]");

    message.channel.send(server+" "+nickname);

}

module.exports.help = {
	name: "vf"
}
