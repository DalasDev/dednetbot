const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_ROLES"))
    return;

  let iUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!iUser)
    return message.reply("пользователь не найден / не указан!");

  var retricIcon = bot.emojis.find("name", "retric");
  var hmmIcon = bot.emojis.find("name", "hmm");

  var user_obj = User.findOne({
    userID: iUser.id
  }, function (err, foundObj) {
    if (err)
      console.log("Error on database findOne: " + err);
    else {
      if (!foundObj)
        console.log("Something stange happend");
      else {
        message.channel.send({embed: {
          color: 3447003,
          icon_url: message.guild.iconURL,
          title: `***Retro Valley*** :zap: ${iUser.displayName}`,
          description: `(**высшая роль:** ${iUser.highestRole.name})`,
          fields: [
          {
            name: `***Личный статус*** :speech_left:`,
            value: `${foundObj.status}`
          },
          {
            name: `***Личный баланс :*** ${foundObj.retrocoinTotal}`,
            value: `***Нарушений :*** ${foundObj.infractions}`
          },
          {
            name: ":red_circle: закрыто\n:red_circle: закрыто\n:red_circle: закрыто\n:red_circle: закрыто\n:red_circle: закрыто",
            value: `Обнят(а)     : ${foundObj.huged}\nПоцелован(а) : ${foundObj.kissed}\nТрахнут(а)   : ${foundObj.fcked}\nПобит(а)     : ${foundObj.hit}\nЗапой        : ${foundObj.drunk}\nУбит(а)      : ${foundObj.killed}`
          }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: message.author.avatarURL,
            text: `© ${message.member.displayName}`
          },
          thumbnail: {
            url: `${iUser.user.avatarURL}`
          }
        }
      });
        // foundObj.save(function(err, updatedObj){
        //   if(err)
        //     console.log(err);
        // });
      }
    }
  });
}

module.exports.help = {
  name: "userinfo"
}
