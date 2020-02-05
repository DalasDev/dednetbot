const {Event} = require('discore.js');

const memberAdd = class extends Event {
  get options() {
    return {name: 'guildMemberAdd'};
  }

  run(member) {
    const col = this.client.db.getCollection('users');

    message.guild.fetchInvites().then(invites => {
      // Поиск использованного инвайта
      const userinvites = col.data.map(i => ({ code: i.invitelink, uses: i.invitecount }));
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

module.exports = memberAdd;
