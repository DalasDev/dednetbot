const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.roles.some(r=>["Fredbot"].includes(r.name)))
    return;

  let x = 0;
  message.guild.members.cache
    .filter((x) => x.roles.cache.has("705855637854355487"))
    .forEach((m) => {
      setTimeout(() => {
        m.send("ЭТА РЕКЛАМА ТЕПЕРЬ И В ЛС!!\n ВУХУУУ, МИНУС 3").catch((e) =>
          console.log(e)
        );
      }, x);
      x = x + 5000;
    });
}

module.exports.help = {
  name: "pizda"
}
