const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.roles.some(r=>["Discord NPC Developer", "God Father"].includes(r.name)))
    return;

  message.delete().catch(O_o=>{});

  let server = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let name1 = args[1];
  let name2 = args.join(" ").slice(22);
  // if(!server)
  //   return message.reply("Команда введена неверно! Пример: !vf [Имя] [Сервер]");
  // if(!nickname)
  //   return message.reply("Команда введена неверно! Пример: !vf [Имя] [Сервер]");

    message.channel.send(server+" "+name1+" "+name2);

}

module.exports.help = {
	name: "vf"
}
