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
  //!info

  if(cmd === `${prefix}info`){

    var bicon = bot.user.displayAvatarURL;
    const infoembed = new Discord.RichEmbed()

  .setTitle("ИНФОРМАЦИЯ")
  .setColor("#4C8BF5")
  .setThumbnail(bicon)
  .addField("Версия бота:", "1.0.0", true)
  .addField("Ник бота:", bot.user.username, true)

  message.channel.send({infoembed});
 }

//-----------------------------------------------------------------------------
  //!test

  if(cmd === `${prefix}test`){
    return message.channel.send("Бот работает!");
  }

//-----------------------------------------------------------------------------
});

bot.login(process.env.BOT_TOKEN);
