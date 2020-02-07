const {Command, Embed} = require('discore.js');

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
    const inviters = invites
      .filter(i => typeof i.invitelink === 'string')
      .map(i => {
        const m = message.guild.member(i.id);
        m.invitecount = invites.filter(inv => inv.invitedbyid === i.id).size;
        return m;
      })
      .filter(m => m.invitecount > 0);

    const sorted = inviters.sort((b, a) => a.invitecount - b.invitecount);
    const authorindex = sorted.findIndex(m => m.id === message.author.id)
    const embed = new Embed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setColor(0x03a9f4)
      .setDescription(sorted.slice(0, 10).map((m, i) => `**${i + 1}.** ${m.user.tag} - ${m.invitecount}`).join('\n'))
      .setFooter(`Ваша позиция в топе: ${authorindex + 1}. Кол-во инвайтов: ${sorted[authorindex] ? sorted[authorindex].invitecount : sorted.length}`);
    message.channel.send(embed);
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
