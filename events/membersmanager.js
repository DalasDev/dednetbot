const {Event, Embed, Mongo} = require('discore.js');

const memberAdd = class extends Event {
  get options() {
    return {name: 'guildMemberAdd'};
  }

  async run(member) {
    const users = this.client.db.getCollection('users');
    const user = await users.findOne({ id: member.id });
      if (user) {
          // let channel = member.guild.channels.get('633756175615262730');
          //
          // let embed = new Embed()
          //     .setColor("#EABD35")
          //     .setAuthor(member.user.username + ", зашел на сервер!", member.user.avatarURL)
          //     .setTimestamp()
          //     .setDescription(member.user.username + " вернулся на сервер! С возвращением!")
          //     // .setDescription("Приветствуем, желаем всего самого хорошего и приятной игры на сервере!")
          //
          // channel.send({embed});
      } else {
          // let channel = member.guild.channels.get('633756175615262730');
          //
          // let embed = new Embed()
          //     .setColor("#4CAF50")
          //     .setAuthor(member.user.username + ", зашел на сервер!", member.user.avatarURL)
          //     .setTimestamp()
          //     .setDescription("Приветствуем, желаем всего самого хорошего и приятной игры на сервере!")
          //
          // channel.send({embed});
          const data = await users.getData();
          const serverid = data.array().sort((b, a) => +a.serverid - +b.serverid)[0].serverid;
          const id = (Number(serverid) || 0) + 1;

          users.upsertOne({id: member.id}, {username: member.user.username, serverid: String(id)});
          member.setNickname(`Anonim #${id}`);
      }
  }
};
// Открывай
//Там еще appjd 
const memberRemove = class extends Event {
  get options() {
    return {name: 'guildMemberRemove'};
  }

  run(member) {
      // let channel = member.guild.channels.get('633756175615262730');
      //
      // let embed = new Embed()
      // 	.setColor("#f44336")
      //     .setAuthor(member.user.username + ", покинул нас!", member.user.avatarURL)
      //     .setTimestamp()
      //     .setDescription("Удачи, надеемся что Вы к нам еще вернетесь :heart:")
      //
      // channel.send({embed});
  }
};

module.exports = [memberAdd, memberRemove];
