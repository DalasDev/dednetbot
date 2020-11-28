const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({ disableEveryone: true });
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const ms = require("ms");
var CronJob = require("cron").CronJob;
var router = express.Router();
bot.commands = new Discord.Collection();
var servers = {};
var prefix = botconfig.prefix;

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter((f) => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("[app.js] Команды не найдены");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`[app.js] Комманда ${f} загружена`);
    bot.commands.set(props.help.name, props);
  });
});


//Выполняеться когда бот готов к работе
bot.on("ready", async () => {

  //Консоль лог что бот онлайн
  console.log(`[app.js] ${bot.user.username} онлайн`);
  //Установка игр
  var statusname = "за сервером Alamo";
  bot.user.setPresence({
    game: {
      name: statusname,
      type: 3,
    },
  });
  //Установка статуса
  bot.user.setStatus("online");
});
bot.login(process.env.BOT_TOKEN);
