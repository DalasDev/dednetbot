const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} онлайн!`);
  bot.user.setGame("on Dalas!");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

//-----------------------------------------------------------------------------
  //!serverinfo

  if (cmd === `${prefix}serverinfo`) {
    const embed = new Discord.RichEmbed()
      .setTitle("ИНФОРМАЦИЯ О СЕРВЕРЕ")
      .setColor("#4C8BF5")
      .addField("Имя сервера:" message.guild.name, true)
      .addField("Версия сервера:", "1.8", true)
      .addField("Сервер создан:", message.guild.createdAt, true)
      .addField("Вы присоединились:", message.member.joinedAt, true)
      .addField("Всего учасников:", message.guild.memderCount, true)

  message.channel.send({embed});
  }

//-----------------------------------------------------------------------------
  //!botinfo

  if(cmd === `${prefix}botinfo`){
    const embed = new Discord.RichEmbed()
      .setTitle("ИНФОРМАЦИЯ О БОТЕ")
      .setColor("#4C8BF5")
      .addField("Версия бота:", "1.0.0", true)
      .addField("Ник бота:", bot.user.username, true)
      .addField("Бот создан:", bot.user.createdAt, true)

  message.channel.send({embed});
 }

//-----------------------------------------------------------------------------
  //!test

  if(cmd === `${prefix}test`){
    return message.channel.send("Бот работает!");
  }

//-----------------------------------------------------------------------------
});

bot.login(process.env.BOT_TOKEN);
