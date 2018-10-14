const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const ms = require("ms");
const YTDL = require("ytdl-core");
var CronJob = require('cron').CronJob;
var router = express.Router();
var mongoose = require("mongoose");
bot.commands = new Discord.Collection();
var Spy = require('./schemas/spy_model.js');
var servers = {};
var prefix = botconfig.prefix;

mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");

app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

var warns = require('./public/warnings.json');

app.use(express.static('public'));


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

function play(connection, message) {
  console.log("DB6");
  var server = servers[message.guild.id];

  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

  server.queue.shift();

  server.dispatcher.on("end", function() {
    console.log("DB7");
    if(server.queue[0]) play(connection, message);
    else connection.disconnect();
  });
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
  // Seconds: 0-59
  // Minutes: 0-59
  // Hours: 0-23
  // Day of Month: 1-31
  // Months: 0-11 (Jan-Dec)
  // Day of Week: 0-6 (Sun-Sat)
}



bot.on("message", async message => {

  if(message.author.id == 'id' || message.author.id == 'id'){
    var spyData = new Spy({
      userName: message.member.displayName,
      userID: message.member.id,
    	date: Date.now(),
    	message: message.content,
      channel: message.channel.name
    });
    spyData.save()
    .then(item => {
      console.log('Новое сообщение от "' + message.member.displayName + '" добавлено в базу');
    })
    .catch(err => {
      console.log("Error on database save: " + err);
    });
  }

});

bot.on('guildMemberAdd', member => {
  let newuser = member
  var User = require('./schemas/user_model.js');
  var user_obj = User.findOne({
		userID: newuser.id
	}, function (err, foundObj) {
		if (err)
			console.log("Error on database findOne: " + err);
		else {
			if (foundObj === null){
				var myData = new User({
					userID: newuser.id,
					displayName: newuser.displayName,
					highestRole: newuser.highestRole.name,
					joinedAt: newuser.joinedAt,
					messages: 0,
          mainmessages: 0,
					infractions: 0,
					retrocoinCash: 0,
					retrocoinBank: 0,
					retrocoinTotal: 0,
					kissed: 0,
					huged: 0,
					fcked: 0,
					hit: 0,
					killed: 0,
					drunk: 0,
					status: "__не установлен__",
					lastScan: Date.now()
				});
				myData.save()
				.then(item => {
					console.log('New user "' + newuser.displayName + '" added to database');
				})
				.catch(err => {
					console.log("Error on database save: " + err);
				});
			}
			else {
				if (!foundObj)
					console.log("Something stange happend");

				}
			}
		});
	});

// bot.on('guildMemberAdd', member => {
//     member.guild.channels.get('493288106699653123').send(':purple_heart: **' + member.user.username + '**, переехал в наш город! :purple_heart:');
// });

// bot.on('guildMemberRemove', member => {
//     member.guild.channels.get('493288106699653123').send(':broken_heart: **' + member.user.username + '**, собрал шмотки и покинул наш город! :broken_heart:');
// });

//Выполняеться когда бот готов к работе
bot.on("ready", async () => {
  //Консоль лог что бот онлайн
  console.log(`[app.js] ${bot.user.username} онлайн`);
  //Установка игры
  bot.user.setPresence({
    game: {
      name: "за Retro Valley!",
      type: 3
    }
  });
  //Установка статуса
  bot.user.setStatus('online');
  idle_repeat();
});


//Выполняеться когда кто-то пишет сообщение
bot.on("message", async message => {

  if(message.author.bot){
    if(message.member != null){
      if(message.member.roles.some(r=>["Mantaro"].includes(r.name))){
        if(message.channel.name == "📵канализация"){
          message.delete()
          .then(msg => console.log(`Удалено сообщение от ${msg.author.username}`))
          .catch(console.error);
        }
      }
    }
    return;
  }

  if(message.channel.type === "dm")
    return;

  if(!message.member.roles.some(r=>["Тех. Администратор", "Губернатор", "РетроТестер", "⭐Полицейский⭐", "⭐Шерифский департамент⭐"].includes(r.name)))
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

bot.on("message", async message => {
  
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  var args = messageArray.slice(1);

  if(message.content.charAt(0) === prefix && cmd == prefix+"play"){

    console.log("DB1");

    console.log("args: " + args);

    if(!args[1])
      return message.reply("похоже вы забыли ввести ссылку на трек");
    if(!message.member.voiceChannel)
      return message.reply("зайдите в голосовой канал сперва");
    console.log("DB2");
    if(!servers[message.guild.id]) servers[message.guild.id] = {
      queue: []
    };
    console.log("DB3");
    var server = servers[message.guild.id];

    server.queue.push(args[1]);
    console.log("DB4");
    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
      console.log("DB5");
      play(connection, message);
    });
  }

  if(message.content == prefix + "skip" || message.content == prefix + "s"){
    var server = servers[message.guild.id];

    if(server.dispatcher) server.dispatcher.end();
  }

  if(message.content == prefix + "disconnect" || message.content == prefix + "dis"){
    var server = servers[message.guild.id];

    if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
  }

});

bot.login(process.env.BOT_TOKEN);
