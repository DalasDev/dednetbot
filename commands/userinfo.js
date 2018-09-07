const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let iUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  let avatar = iUser.user.avatarURL;
  if(message.author.premium)
    console.log("U r premium");

  const embed = new Discord.RichEmbed()
  .setTitle("ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ")
  .setColor("#4C8BF5")
  .setThumbnail(avatar)
  .addField("Ник пользователя:", `${iUser}`, true)
  .addField("ID пользователя:", `${iUser.id}`, true)
  .addField("Присоединился:", `${iUser.joinedAt}`, true)
  .addField("Зарегистрировался:", iUser.user.createdAt, true)

  message.channel.send({embed});
}

module.exports.help = {
  name: "userinfo"
}
