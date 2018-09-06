const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let iUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  let avatar = iUser.iconURL;
  const embed = new Discord.RichEmbed()
  .setTitle("ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ")
  .setColor("#4C8BF5")
  .setThumbnail(avatar)
  .addField("Ник пользователя:", `${iUser}`, true)
  .addField("ID пользователя:", `${iUser.id}`, true)
  .addField("Присоединился:", `${iUser.joinedAt}`, true)
  .addField("Зарегистрировался:", iUser.createdAt, true)
  .addField("E-mail аккаунта:", iUser.email, true)


  message.channel.send({embed});
}

module.exports.help = {
  name: "userinfo"
}
