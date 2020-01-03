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
