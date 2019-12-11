const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const ms = require("ms");
const isUrl = require("is-url");
var CronJob = require('cron').CronJob;
bot.commands = new Discord.Collection();
var servers = {};
var prefix = botconfig.prefix;

// app.use("/", (req, res) => {
//  res.sendFile(__dirname + "/public/index.html");
// });

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

function formatDate(date) {
  var monthNames = [
    "января", "февраля", "марта",
    "апреля", "мая", "июня", "июля",
    "августа", "сентября", "октября",
    "ноября", "декабря"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var time = hour + ":" + minute + ":" + second;

  return day + ' ' + monthNames[monthIndex] + ' ' + year + ', ' + time;
}

function idle_repeat(){
  console.log("[app.js] New CronJob started");

  var cronindex = 1;
  var CronJob = require('cron').CronJob;
  new CronJob('0 * * * * *', function() {
    let i = (cronindex == 1) ? " minute" : " minutes";
    console.log("[app.js] CronJob: Bot is online for " + cronindex + i);
    cronindex++;
  }, null, true, 'Europe/Paris');

  let commandfile = bot.commands.get("salariespayement");
  new CronJob('0 0 0 * * *', function() {
    //запускается каждый раз когда на часах 0 секунд 0 минут и 0 часов, тоесть в полночь... Понял, сорян... Ща сделаю...
    console.log("New payement process started by CronJob!");
    commandfile.run(bot);
  }, null, true, 'Europe/Paris');

  new CronJob('* * 0 * * *', function() {
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var creationDate = new Date('2017-01-12T11:59:44');
    var todayDate = new Date();

    var diffDays = Math.round(Math.abs((creationDate.getTime() - todayDate.getTime())/(oneDay)));

    var statusname = "за сервером " + diffDays + " дней";
    bot.user.setPresence({
      game: {
        name: statusname,
        type: 3
      }
    });
  }, null, true, 'Europe/Paris');

}

  //message.author.id == '363730744553766913' || message.author.id == '381457099789565953'

bot.on('guildMemberAdd', member => {
    let channel = member.guild.channels.get('633756175615262730');

    let hiEmbed = new Discord.RichEmbed()
        .setDescription(':city_sunset: **' + member.user.username + "**, зашел на сервер!")
        .setColor("#4CAF50")
        .setFooter('Поприветствуем!', member.user.avatarURL);

    channel.send({hiEmbed});
});

bot.on('guildMemberRemove', member => {
    let channel = member.guild.channels.get('633756175615262730');

    let biEmbed = new Discord.RichEmbed()
        .setDescription(':city_dusk: **' + member.user.username + "**, покинул нас!")
        .setColor("#f44336")
        .setFooter('Удачи!', member.user.avatarURL);

    channel.send({biEmbed});
});

//Выполняеться когда бот готов к работе
bot.on("ready", async () => {
  //Консоль лог что бот онлайн
  console.log(`[app.js] ${bot.user.username} онлайн`);
  //Установка игр
  var statusname = "за сервером DedNet";
  bot.user.setPresence({
    game: {
      name: statusname,
      type: 3
    }
  });
  //Установка статуса
  bot.user.setStatus('online');
  idle_repeat();

});


//Выполняеться когда кто-то пишет сообщение
bot.on("message", async message => {

  if(message.channel.type === "dm")
    return;

  if (message.content.charAt(0) === prefix){
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    var args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));

    if(commandfile){
      commandfile.run(bot, message, args);
    }
  }
  else if (message.content.charAt(0) === "!" && message.content.charAt(1) === "w" && message.content.charAt(2) === "a"
   && message.content.charAt(3) === "r" && message.content.charAt(4) === "n"){
    let messageArray = message.content.split(" ");
    let cmd = "!warn2";
    var args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));

    if(commandfile){
      commandfile.run(bot, message, args);
    }
  }
  else if (message.content.charAt(0) === "?" && message.content.charAt(1) === "s" && message.content.charAt(2) === "e"
   && message.content.charAt(3) === "l" && message.content.charAt(4) === "l" && message.content.charAt(5) === "-"
   && message.content.charAt(6) === "i" && message.content.charAt(7) === "t" && message.content.charAt(8) === "e"
   && message.content.charAt(9) === "m"){
    let messageArray = message.content.split(" ");
    let cmd = "!sellscan";
    var args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));

    if(commandfile){
      commandfile.run(bot, message, args);
    }
  }
  else if (message.content.charAt(0) === "?" && message.content.charAt(1) === "s" && message.content.charAt(2) === "e"
   && message.content.charAt(3) === "l" && message.content.charAt(4) === "l"){
    let messageArray = message.content.split(" ");
    let cmd = "!sellscan";
    var args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));

    if(commandfile){
      commandfile.run(bot, message, args);
    }
  }
  else {
    let cmd = "scanuser";
    let commandfile = bot.commands.get(cmd);
    if(commandfile){
      commandfile.run(bot, message);
    }
  }

});

bot.login(process.env.BOT_TOKEN);
