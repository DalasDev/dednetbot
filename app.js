const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const express = require('express');
const app = express();
bot.commands = new Discord.Collection();

app.use(express.static('public'));

app.listen(process.env.PORT || 8080, () => 
  console.log("[app.js] Сайт запущен")
);

fs.readdir("./commands/", (err, files) => {
  if (err)
    console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("[app.js] Команды не найдены");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`[app.js] Комманда ${f} загружена`);
    bot.commands.set(props.help.name, props);
  })
})

bot.on("ready", async () => {
  console.log(`[app.js] ${bot.user.username} онлайн`);
});

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));

  if(commandfile){
    console.log("[app.js] Command to execute: " + cmd);
    commandfile.run(bot, message, args);
  }
});

bot.login(process.env.BOT_TOKEN);
