const {Event} = require('discore.js');
const {CronJob} = require('cron');

const ready = class extends Event {
  get options() {
    return {name: 'ready'};
  }

  run() {
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
    bot.user.setStatus('online');
  }
};

const cron = class extends Event {
  get options() {
    return {name: 'ready', once: true};
  }

  run() {
    console.log("[app.js] New CronJob started");

    var cronindex = 1;
    new CronJob('0 * * * * *', function() {
      let i = (cronindex == 1) ? " minute" : " minutes";
      console.log("[app.js] CronJob: Bot is online for " + cronindex + i);
      cronindex++;
    }, null, true, 'Europe/Paris');

    // let commandfile = bot.commands.get("salariespayement");
    // new CronJob('0 0 0 * * *', function() {
    //   //запускается каждый раз когда на часах 0 секунд 0 минут и 0 часов, тоесть в полночь... Понял, сорян... Ща сделаю...
    //   console.log("New payement process started by CronJob!");
    //   commandfile.run(bot);
    // }, null, true, 'Europe/Paris');

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
};

module.exports = [ready, cron]
