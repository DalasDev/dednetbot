const {Event, Embed} = require('discore.js');

const emojis = {
  getlink: '782182189017333770',
  topinvites: '782182799901327411'
};
const messageId = '782164620898336778';

const memberAdd = class extends Event {
  get options() {
    return {name: 'guildMemberAdd'};
  }

  run(member) {
    try {
      const col = this.client.db.getCollection('users');
      if (col.findOne({ id: member.id })){
        console.log(`Инвайт не засчитан т.к. участник есть в бд: ${member.id}`);
        return;
      }
      member.guild.fetchInvites().then(invites => {
        // Поиск использованного инвайта
        const userinvites = col.data.map(i => ({ code: i.invitelink, uses: i.invitecount || 0 }));
        const uicodes = userinvites.map(i => i.code);
        invites = invites.filter(i => uicodes.includes(i.code));
        const invite = invites.find(i => i.uses > userinvites.find(ui => ui.code === i.code).uses);
        if (!invite) return;

        const inviterinfo = col.findOne({ invitelink: invite.code });
        col.updateOne({ id: inviterinfo.id }, { invitecount: invite.uses });
        col.upsertOne({ id: member.id }, { invitedbyid: inviterinfo.id });
      });
  } catch(e) {console.log('invitemanager.33', e)}
  }
};

const actions = class extends Event {
  get options() {
    return { name: 'raw' };
  }

  run(packet) {
    try {
      if (
        !['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)
      ) {
        return;
      }
      if (packet.d.message_id !== messageId) return;
      const emojiId = packet.d.emoji.id || packet.d.emoji.name;
      if (!emojiId) return;
      if (!Object.values(emojis).includes(emojiId)) return;
      const user = this.client.users.get(packet.d.user_id);
      if (!user) return;
      const channel = this.client.channels.get(packet.d.channel_id);
      if (!channel) return;
      if (emojiId === emojis.getlink) {
        const member = channel.guild.member(user);
        if (member) member.addRole("676051289033146398").catch(() => {});
        const userinfo = this.client.db
          .getCollection('users')
          .getOne({ id: user.id });
        channel.guild.fetchInvites().then(invites => {
          const userinvite = invites.get(userinfo.invitelink);
          if (typeof userinfo.invitelink === 'string') {
            if (userinvite) {
              const msgTemplate = `У вас уже имеется ссылка: https://discord.gg/${userinfo.invitelink}`;
              return user.send(msgTemplate).catch(() => this.client.channels.get('765175773484679208').send(`${user} ${msgTemplate}`));
            }
            console.log(
              `Ссылка пользователя ${userinfo.id} была удалена. Старая ссылка: https://discord.gg/${userinfo.invitelink}`
            );
          }
          channel
            .createInvite({
              temporary: false,
              maxAge: 0,
              maxUses: 0,
              unique: true,
            })
            .then(invite => {
              const msgTemplate = `Ваша ссылка: https://discord.gg/${invite.code}`;
              this.client.db
                .getCollection('users')
                .upsertOne({ id: user.id }, { invitelink: invite.code });
              user.send(msgTemplate).catch(() => this.client.channels.get('765175773484679208').send(`${user} ${msgTemplate}`));
            });
        });
      }
      if (emojiId === emojis.topinvites) {
        if(packet.d.user_id != "358212316975726603"){
            return user.send("Функция временно не доступна!").catch(() => this.client.channels.get('765175773484679208').send("Функция временно не доступна!"));
        }
        const dbcol = this.client.db.getCollection('users');
        const invites = dbcol.data.filter(i =>
          channel.guild.members.map(m => m.id).includes(i.id)
        );
        const inviters = invites
          .filter(i => typeof i.invitelink === 'string')
          .map(i => {
            const m = channel.guild.member(i.id);
            let toadd = i.toadd ? i.toadd : 0;
            m.invitecount = invites.filter(inv => inv.invitedbyid === i.id).size + toadd;
            return m;
          })
          .filter(m => m.invitecount > 0);

        const sorted = inviters.sort((b, a) => a.invitecount - b.invitecount);
        const authorindex = sorted.findIndex(m => m.id === user.id);

        const embed = new Embed()
          .setAuthor(channel.guild.name, channel.guild.iconURL)
          .setColor(0x03a9f4)
          .setDescription(
            sorted
              .slice(0, 10)
              .map((m, i) => `**${i + 1}.** ${m.user.tag} - ${m.invitecount}`)
              .join('\n')
          )
          .setFooter(
            `Ваша позиция в топе: ${
              (authorindex < 0 ? sorted.length : authorindex) + 1
            }. Кол-во инвайтов: ${
              sorted[authorindex] ? sorted[authorindex].invitecount : 0
            }`
          );
        user.send(embed).catch(() => this.client.channels.get('765175773484679208').send(`${user}`, embed));
      }
  } catch (e) {console.log('invitemanager.125', e)}
  }
};

module.exports = [memberAdd, actions];
