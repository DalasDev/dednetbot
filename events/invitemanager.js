const {Event, Embed} = require('discore.js');

const memberAdd = class extends Event {
  get options() {
    return {name: 'guildMemberAdd'};
  }

  run(member) {
    const col = this.client.db.getCollection('users');

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
  }
};

const actions = class extends Event {
  get options() {
    return { name: 'raw' };
  }

  run(packet) {
    if (packet.t !== 'MESSAGE_REACTION_ADD') return;
    if (packet.d.message_id !== '675351896525111326') return;
    const emojiId = packet.d.emoji.id || packet.d.emoji.name;
    if (!['657711692461113385', '657630604971737144'].includes(emojiId)) return;
    const user = this.client.users.get(packet.d.user_id);
    const channel = this.client.channels.get(packet.d.channel_id);
    if (emojiId === '657711692461113385') {
      const userinfo = this.client.db
        .getCollection('users')
        .getOne({ id: user.id });
      channel.guild.fetchInvites().then(invites => {
        const userinvite = invites.get(userinfo.invitelink);
        if (typeof userinfo.invitelink !== 'string' && !userinvite) {
          console.log(
            `Ссылка пользователя ${userinfo.id} была удалена. Старая ссылка: discord.gg/${userinfo.invitelink}`
          );
        }
        if (typeof userinfo.invitelink === 'string' && userinvite) {
          const msgTemplate = `У вас уже имеется ссылка: discord.gg/${userinfo.invitelink}`;
          return user.send(msgTemplate).catch(() => channel.send(msgTemplate));
        }
        channel
          .createInvite({
            temporary: false,
            maxAge: 0,
            maxUses: 0,
            unique: true,
          })
          .then(invite => {
            const msgTemplate = `Ваша ссылка: discord.gg/${invite.code}`;
            this.client.db
              .getCollection('users')
              .upsertOne({ id: user.id }, { invitelink: invite.code });
            user.send(msgTemplate).catch(() => channel.send(msgTemplate));
          });
      });
    }
    if (emojiId === '657630604971737144') {
      const dbcol = this.client.db.getCollection('users');
      const invites = dbcol.data.filter(i =>
        channel.guild.members.map(m => m.id).includes(i.id)
      );
      const inviters = invites
        .filter(i => typeof i.invitelink === 'string')
        .map(i => {
          const m = channel.guild.member(i.id);
          m.invitecount = invites.filter(inv => inv.invitedbyid === i.id).size;
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
          `Ваша позиция в топе: ${authorindex + 1}. Кол-во инвайтов: ${
            sorted[authorindex]
              ? sorted[authorindex].invitecount
              : sorted.length
          }`
        );
      channel.send(embed);
    }
  }
};

module.exports = [memberAdd, actions];
