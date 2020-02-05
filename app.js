const ms = require("ms");
const {CronJob} = require('cron');
const {prefix} = require('./botconfig.json');
const {Core,Mongo} = require('discore.js');

const db = new Mongo(process.env.MONGO_URL)
  .addModel('users', {
    id: {type: Mongo.Types.String, default: undefined},
    username: {type: Mongo.Types.String, default: undefined},
    invitelink: {type: Mongo.Types.String, default: undefined},
    invitecount: {type: Mongo.Types.Number, default: 0},
    invitedbyid: {type: Mongo.Types.String, default: undefined},
  });

  // npm i zargovv/discore.js -S

new Core({
  token: process.env.BOT_TOKEN,
  prefix: "!",
  prefixOptions: {
    spaceSeparator: true,
    mention: true,
  },
  commandOptions: {
    argsSeparator: / +/g,
  },
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
