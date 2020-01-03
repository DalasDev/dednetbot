const ms = require("ms");
const {CronJob} = require('cron');
const {prefix} = require('./botconfig.json');
const {Core,Mongo} = require('discore.js');

const db = new Mongo(process.env.MONGO_URL)
  .addModel('users', {
    id: {type: Mongo.Types.String, default: undefined},
    username: {type: Mongo.Types.String, default: undefined}
  })

new Core({
  token: process.env.BOT_TOKEN,
  prefix: "!",
  spaceAfterPrefix: true,
  mentionPrefix: false,
  splitArgs: / +/g,
  disableEveryone: true,
  db
});

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

//
//
// //Выполняеться когда кто-то пишет сообщение
// bot.on("message", async message => {
//
//   if(message.channel.type === "dm")
//     return;
//
//   if (message.content.charAt(0) === prefix){
//     let messageArray = message.content.split(" ");
//     let cmd = messageArray[0];
//     var args = messageArray.slice(1);
//     let commandfile = bot.commands.get(cmd.slice(prefix.length));
//
//     if(commandfile){
//       commandfile.run(bot, message, args);
//     }
//   }
//   else if (message.content.charAt(0) === "!" && message.content.charAt(1) === "w" && message.content.charAt(2) === "a"
//    && message.content.charAt(3) === "r" && message.content.charAt(4) === "n"){
//     let messageArray = message.content.split(" ");
//     let cmd = "!warn2";
//     var args = messageArray.slice(1);
//     let commandfile = bot.commands.get(cmd.slice(prefix.length));
//
//     if(commandfile){
//       commandfile.run(bot, message, args);
//     }
//   }
//   else if (message.content.charAt(0) === "?" && message.content.charAt(1) === "s" && message.content.charAt(2) === "e"
//    && message.content.charAt(3) === "l" && message.content.charAt(4) === "l" && message.content.charAt(5) === "-"
//    && message.content.charAt(6) === "i" && message.content.charAt(7) === "t" && message.content.charAt(8) === "e"
//    && message.content.charAt(9) === "m"){
//     let messageArray = message.content.split(" ");
//     let cmd = "!sellscan";
//     var args = messageArray.slice(1);
//     let commandfile = bot.commands.get(cmd.slice(prefix.length));
//
//     if(commandfile){
//       commandfile.run(bot, message, args);
//     }
//   }
//   else if (message.content.charAt(0) === "?" && message.content.charAt(1) === "s" && message.content.charAt(2) === "e"
//    && message.content.charAt(3) === "l" && message.content.charAt(4) === "l"){
//     let messageArray = message.content.split(" ");
//     let cmd = "!sellscan";
//     var args = messageArray.slice(1);
//     let commandfile = bot.commands.get(cmd.slice(prefix.length));
//
//     if(commandfile){
//       commandfile.run(bot, message, args);
//     }
//   }
//   else {
//     let cmd = "scanuser";
//     let commandfile = bot.commands.get(cmd);
//     if(commandfile){
//       commandfile.run(bot, message);
//     }
//   }
//
// });
//
// bot.login(process.env.BOT_TOKEN);
