const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({ disableEveryone: true });
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const ms = require("ms");
const YTDL = require("ytdl-core");
const isUrl = require("is-url");
var CronJob = require("cron").CronJob;
var router = express.Router();
var mongoose = require("mongoose");
bot.commands = new Discord.Collection();
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

var Spy = require("./schemas/spy_model.js");
var User = require("./schemas/user_model.js");
const Member = require("./schemas/member");
var servers = {};
var prefix = botconfig.prefix;

mongoose.Promise = global.Promise;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));

app.set("view engine", "handlebars");

var warns = require("./warnings.json");

app.use(express.static("public"));

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

const invites = {};

bot.on("guildMemberAdd", async (member) => {
  member.guild.fetchInvites().then(async (guildInvites) => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find((i) => ei.get(i.code).uses < i.uses);
    const inviter = bot.users.cache.get(invite.inviter.id);
    const inv = member.guild.members.cache.get(inviter.id);

    if (inviter.id == "247022049476870144") return;
    const user =
      (await Member.findOne({ id: member.id })) ||
      new Member({ id: member.id, displayName: member.displayName });
    const mem =
      (await Member.findOne({ id: inviter.id })) ||
      new Member({ id: inviter.id, displayName: inv.displayName });

    if (!user.inviter) mem.invites++;
    member.guild.channels.cache
      .get("782192035775774770")
      .send(
        `${member.user.tag} зашел по ссылке ${invite.code}, которая принадлежит ${inviter.tag}. Было испольовано ${mem.invites} раз.`
      );

    if (user.inviter) return;

    user.inviter = inviter.id;
    mem.members.push(member.id);
    mem.save().catch((e) => {});
    user.save().catch((e) => {});
  });
});

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

function formatDate(date) {
  var monthNames = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var time = hour + ":" + minute + ":" + second;

  return day + " " + monthNames[monthIndex] + " " + year + ", " + time;
}

function idle_repeat() {
  console.log("[app.js] New CronJob started");

  var cronindex = 1;
  var CronJob = require("cron").CronJob;
  new CronJob(
    "0 * * * * *",
    function () {
      let i = cronindex == 1 ? " minute" : " minutes";
      console.log("[app.js] CronJob: Bot is online for " + cronindex + i);
      cronindex++;
    },
    null,
    true,
    "Europe/Paris"
  );

  // let commandfile = bot.commands.get("salariespayement");
  // new CronJob('0 0 0 * * *', function() {
  //   //запускается каждый раз когда на часах 0 секунд 0 минут и 0 часов, тоесть в полночь... Понял, сорян... Ща сделаю...
  //   console.log("New payement process started by CronJob!");
  //   commandfile.run(bot);
  // }, null, true, 'Europe/Paris');

  new CronJob(
    "* * 0 * * *",
    function () {
      var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      var creationDate = new Date("2017-01-12T11:59:44");
      var todayDate = new Date();

      var diffDays = Math.round(
        Math.abs((creationDate.getTime() - todayDate.getTime()) / oneDay)
      );

      var statusname = "за сервером " + diffDays + " дней";
      bot.user.setPresence({
        game: {
          name: statusname,
          type: 3,
        },
      });
    },
    null,
    true,
    "Europe/Paris"
  );
}

bot.on("message", async (message) => {
  if (message.channel.type === "dm") return;

  if (message.content.charAt(0) === prefix) {
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    var args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));

    if (commandfile) {
      commandfile.run(bot, message, args);
    }
  }
});

bot.on("guildMemberRemove", (member) => {
  member.guild.channels.cache
    .get("782165776630939649")
    .send(`${member.user.tag} ливнул с сервера`);
});
//message.author.id == '363730744553766913' || message.author.id == '381457099789565953'

// bot.on("guildMemberAdd", (member) => {
//   let channel = member.guild.channels.get("633756175615262730");

//   let embed = new Discord.RichEmbed()
//     .setColor("#4CAF50")
//     .setAuthor(
//       member.user.username + ", зашел на сервер!",
//       member.user.avatarURL
//     )
//     .setTimestamp()
//     .setDescription(
//       "Приветствуем, желаем всего самого хорошего и приятной игры на сервере!"
//     );

//   channel.send({ embed });
// });

//Выполняеться когда бот готов к работе
bot.on("ready", async () => {
  setTimeout(() => {
    bot.guilds.cache.forEach((g) => {
      g.fetchInvites().then((guildInvites) => {
        invites[g.id] = guildInvites;
      });
    });
  }, 1000);

  //Консоль лог что бот онлайн
  console.log(`[app.js] ${bot.user.username} онлайн`);
  //Установка игр
  var statusname = "за сервером DedNet";
  bot.user.setPresence({
    game: {
      name: statusname,
      type: 3,
    },
  });
  //Установка статуса
  bot.user.setStatus("online");
  idle_repeat();
});
bot.login(process.env.BOT_TOKEN);
