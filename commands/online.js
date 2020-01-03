const {Command} = require('discore.js');

module.exports = class extends Command {
  get options() {
    return {
      enabled: true,
      name: 'online',
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
    if(!message.member.roles.some(r=>["Discord NPC Developer"].includes(r.name)))
      return;

    message.delete().catch(O_o=>{});
    message.channel.send("Я онлайн!");
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
