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

  //!test

  if(cmd === `${prefix}test`){
    return message.channel.send("Бот работает!");
  }

  //!info

  if(cmd === `${prefix}info`){

    let botembed = new Discord.RichEmbed()
    .setDescription("Информация")
    .setColor("#1AA260")
    .addField("Ник бота: ", bot.user.username)
    .addField("Версия бота: 1.0.0")

    return message.channel.send(botembed);
  }

});

bot.login(process.env.BOT_TOKEN);
