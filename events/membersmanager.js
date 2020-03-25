const {Event, Embed, Mongo} = require('discore.js');

const memberAdd = class extends Event {
  get options() {
    return {name: 'guildMemberAdd'};
  }

  run(member) {
      if(this.client.db.getCollection('users').findOne(d => d.id === member.user.id)){
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
      }else{
          // let channel = member.guild.channels.get('633756175615262730');
          //
          // let embed = new Embed()
          //     .setColor("#4CAF50")
          //     .setAuthor(member.user.username + ", зашел на сервер!", member.user.avatarURL)
          //     .setTimestamp()
          //     .setDescription("Приветствуем, желаем всего самого хорошего и приятной игры на сервере!")
          //
          // channel.send({embed});
          const collection = this.client.db.getCollection('users');
          const data = await collection.getData();
          const serverid = data.array().sort((b, a) => +a.serverid - +b.serverid)[0].serverid;
          const id = (Number(serverid) || 0) + 1;

          this.client.db.getCollection('users').upsertOne({id: member.user.id}, {username: member.user.username}, {serverid: id});
          member.user.setNickname(`Anonim #${id}`);

      }
  }
};

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
