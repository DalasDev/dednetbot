const {Command} = require('discore.js');

module.exports = class extends Command {
  get options() {
    return {
      enabled: true,
      name: 'sendpromo',
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
    if(!message.member.roles.some(r=>["Discord NPC Developer", "Technical Admin"].includes(r.name)))
      return;
    let id = args[0];
    let promo = args[1];
    message.delete().catch(O_o=>{});
    client.users.get(id).send("Привет! Вот твой персональный промокод:" + promo + " \n Этот код вы можете ввести при регистрации, а так же в самой игре \n M - Настройки - Промокод");
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
