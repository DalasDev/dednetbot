const {Command} = require('discore.js');

module.exports = class extends Command {
  get options() {
    return {
      enabled: true,
      name: 'topinvites',
      id: undefined,
      cooldown: 0,
      aliases: [],
      permLevel: 0,
      description: undefined,
      usage: undefined,
      once: false
    };
  }

  run(message, args) {
    const dbcol = this.client.db.getCollection('users');
    const invites = dbcol.data.filter(i => message.guild.members.map(m => m.id).includes(i.id));
    console.log(invites);
    const inviters = invites
      .filter(i => typeof i.invitelink === 'string')
      .map(i => {
        const m = message.guild.member(i.id);
        m.invitecount = invites.filter(inv => inv.invitedbyid === i.id).size;
        return m;
      })
      .filter(m => m.invitecount > 0);
    console.log(inviters.map(m => ({ id: m.id, uses: m.invitecount })));
  }

  disabledRun(message, args) {
    message.channel.send('Команда выключена.');
  }

  noPermsRun(message, args) {
    message.channel.send('У вас нет прав для использования данной команды.');
  }

  init() {
    console.log(`Команда ${this.name} загружена!`);
  }
};
