const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const ms = require("ms");
var CronJob = require('cron').CronJob;
var router = express.Router();
bot.commands = new Discord.Collection();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

var warns = require('./public/warnings.json');
//var indexpage = require('./public/index.html');

app.use(express.static('public'));
// GET роут
// app.get('/', function (req, res) {
//   app.use('/', indexpage);
// });

// app.get('/warnings', function (req, res) {
//   app.use('/warnings', warns);
// });

// POST роут
// app.post('/', function (req, res) {
//   res.send('/public/main/index.html');
// });

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

function idle_repeat(){
  console.log("[app.js] IDLE timer is set until next minute");

  var cronindex = 1;
  var CronJob = require('cron').CronJob;
  new CronJob('0 * * * * *', function() {
    let i = (cronindex == 1) ? " minute" : " minutes";
    console.log("[app.js] CronJob: Bot is online for " + cronindex + i);
    cronindex++;
  }, null, true, 'Europe/Paris');
  // Seconds: 0-59
  // Minutes: 0-59
  // Hours: 0-23
  // Day of Month: 1-31
  // Months: 0-11 (Jan-Dec)
  // Day of Week: 0-6 (Sun-Sat)
  
  // setTimeout(function(){
  //   idle_repeat();
  // }, ms("1m"));
}

bot.on("ready", async () => {
  console.log(`[app.js] ${bot.user.username} онлайн`);
  idle_repeat();
});

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  if (message.content.charAt(0) === prefix){
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));

    if(commandfile){
      console.log("[app.js] Command to execute: " + cmd);
      commandfile.run(bot, message, args);
    }
  }
});

bot.login(process.env.BOT_TOKEN);
