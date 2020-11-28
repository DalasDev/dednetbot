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

mongoose.Promise = global.Promise;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));

app.set("view engine", "handlebars");

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
  var statusname = "за сервером Alamo";
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
