const {Event} = require('discore.js');
const {CronJob} = require('cron');

const ready = class extends Event {
  get options() {
    return {name: 'ready'};
  }

  run() {
    // this.client.db.connection.collection('users').insertMany(this.client.guilds.get('633421720572919838').members.map(m => ({
    //     id: m.id,
    //     username: m.displayName,
    //     invitelink: undefined,
    //     invitecount: 0,
    //     invitedbyid: undefined,
    // })), (err, res) => {
    //   if (err) return console.error(err);
    //   console.log('Юзеры добавлены');
    // });

    //Консоль лог что бот онлайн
    console.log(`[app.js] ${this.client.user.username} онлайн`);
    //Установка игр
    var statusname = "за сервером DedNet";
    this.client.user.setPresence({
      game: {
        name: statusname,
        type: 3
      }
    });
    this.client.user.setStatus('online');
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
  }
};

module.exports = [ready, cron]
