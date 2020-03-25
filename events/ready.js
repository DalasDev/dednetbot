const {Event} = require('discore.js');
const {CronJob} = require('cron');
//
function r(client) {
  const { db } = client;
//   const col = db.getCollection('users');
//   col.fetch().then(docs => {
//     docs = docs.filter(e => e.invitecount > 0);
//     docs.forEach(doc => {
//       const s = docs.filter(inv => inv.invitedbyid === doc.id).size;
//       try {
//         col.updateOne({ id: doc.id }, { toadd: doc.invitecount - s });
//       } catch (e) {}
//     });
//   });
// }

const ready = class extends Event {
  get options() {
    return {name: 'ready'};
  }

  run() {
    if (this.clsient.db.connection.readyState === 1) r(this.client);
    else this.client.db.connection.on('connected', () => r(this.client));
    // ---------------------------------------------------------------------
    this.client.db.connection.collection('users').insertMany(this.client.guilds.get('633421720572919838').members.map(m => ({
        id: m.id,
        username: m.displayName,
        invitelink: undefined,
        invitecount: 0,
        invitedbyid: undefined,
    })), (err, res) => {
      if (err) return console.error(err);
      console.log('Юзеры добавлены');
    });





    //Консоль лог что бот онлайн
    console.log(`[app.js] ${this.client.user.username} онлайн`);
    //AddRole из Ready
    // const channel = this.client.channels.get("633756167600078849");
    // const user = this.client.users.get("523018741764718615");
    // channel.guild.member(user).addRole("676051289033146398");
    //Установка игр
    var statusname = "за DEEPWEB";
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
