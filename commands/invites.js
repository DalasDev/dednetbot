const { MessageEmbed } = require("discord.js");
const Member = require("../schemas/member");

module.exports.run = async (bot, message, args) => {
  const a = message.mentions.members.first() || message.member;

  const mem =
    (await Member.findOne({ id: a.id })) ||
    new Member({ id: a.id, displayName: a.displayName });

  const place = await Member.find({
    invites: { $gte: mem.invites },
  }).countDocuments();
  const embed = new MessageEmbed()
    .setTitle(`Приглашения ${a.displayName}`)
    .setDescription(`Всего приглашений: ${mem.invites}`)
    .setColor(message.member.displayHexColor)
    .addField(`Пользователи`, `${mem.members.map((x) => `<@${x}>`) || "Пусто"}`)
    .setFooter(`Место: ${place}`, a.user.displayAvatarURL({ dynamic: true }));

  message.member.send({ embed: embed });
  message.delete();
};

module.exports.help = {
  name: "invites",
};
