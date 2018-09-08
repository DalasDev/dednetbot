const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


  //лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return;

  message.delete().catch(O_o=>{});

  let iUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  if (!iUser)
    return message.reply("пользователь не найден / не указан!");

  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("Похоже у тебя недостаточно на это прав, дружище :thinking:.");

  let avatar = iUser.user.avatarURL;

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
