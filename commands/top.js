const Member = require("../schemas/member");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const mem = await Member.findOne({ id: message.member.id });
  const top = await Member.find().sort({ invites: -1 }).limit(10);

  if (mem) {
    var less = await Member.find({
      invites: { $lte: mem.invites - 1 },
    })
      .sort({ invites: -1 })
      .limit(2);
    var gr = await Member.find({
      invites: { $gte: mem.invites + 1 },
    })
      .sort({ invites: 1 })
      .limit(2);
    gr = gr.reverse();

    var num = await Member.find({
      invites: { $gte: mem.invites },
    }).countDocuments();
  }

  let embed = new MessageEmbed()
    .setTitle("Топ по приглашениям")
    .setColor(message.member.displayHexColor);

  let y = 1;

  embed.addField(
    "Топ 10",
    top.map(
      (x) => `**${y++}.** \`\`${x.displayName}\`\` - ${x.invites} приглашений`
    )
  );

  let first = gr || [];
  let second = less || [];
  if (mem) {
    var your = [...first, mem, ...second];
    y = num - first.length;
  }

  let text = mem
    ? your.map(
        (x) => `**${y++}.** \`\`${x.displayName}\`\` - ${x.invites} приглашений`
      )
    : "Тебя нет в датабазе";

  embed.addField("Твоя позиция", text);

  message.member.send({ embed: embed });
  message.delete();
};

module.exports.help = {
  name: "top",
};
