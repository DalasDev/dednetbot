const {Command} = require('discore.js');

module.exports = class extends Command {
  get options() {
    return {
      enabled: true,
      name: 'saychannel',
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
    if(!message.member.roles.some(r=>["Owner", "Administrator"].includes(r.name)))
        return;
    const id = args.shift();ы
    const content = args.join(' ');
    message.delete().catch(O_o=>{});
    const channel = this.client.channels.cache.get(id);
    channel.send(content);

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
