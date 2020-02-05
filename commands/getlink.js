const {Command} = require('discore.js');

module.exports = class extends Command {
  get options() {
    return {
      enabled: true,
      name: 'getlink',
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
    const userinfo = this.client.db.getCollection('users').getOne({id: message.author.id});
    message.delete().catch(() => {console.log('Бот не имеет доступ к удалению сообщений')});
    message.guild.fetchInvites().then(invites => {
      const userinvite = invites.get(userinfo.invitelink);
      if (typeof userinfo.invitelink !== 'string' && !userinvite){
          console.log(`Ссылка пользователя ${userinfo.id} была удалена. Старая ссылка: discord.gg/${userinfo.invitelink}`);
      }
      if (typeof userinfo.invitelink === 'string' && userinvite) {
        const msgTemplate = `У вас уже имеется ссылка: discord.gg/${userinfo.invitelink}`;
        return message.author.send(msgTemplate).catch(() => message.channel.send(msgTemplate));
    }else{
      message.channel.createInvite({ temporary: false, maxAge: 0, maxUses: 0, unique: true }).then(invite => {
        const msgTemplate = `Ваша ссылка: discord.gg/${invite.code}`;
        this.client.db.getCollection('users').upsertOne({ id: message.author.id }, { invitelink: invite.code });
        message.author.send(msgTemplate).catch(() => message.channel.send(msgTemplate));
      });
    }
    });
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
