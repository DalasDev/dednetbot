const {Command} = require('discore.js');

module.exports = class extends Command {
  get options() {
    return {
      enabled: true,
      name: 'setstatus',
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

      if(!message.member.roles.some(r=>["Discord NPC Developer", "God Father"].includes(r.name)))
        return;

      message.delete().catch(O_o=>{});

      let bstatus = args[0];
      if(!bstatus)
        return message.reply("статус не указан!");

      //if(status == "online" || status == "idle" || status == "invisible" || status == "invis" || status == "dnd")


      if(bstatus == 'online'){
        this.client.user.setStatus('online');

      }else if(bstatus == 'idle'){
        this.client.user.setStatus('idle');

      }else if(bstatus == 'invisible' || bstatus == 'invis'){
        this.client.user.setStatus('invisible');

      }else if(bstatus == 'dnd'){
        this.client.user.setStatus('dnd');

      }else{
        return message.reply("не верный статус! (online/idle/invis/dnd)");
      }
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
