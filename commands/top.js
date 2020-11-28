const Member = require("../schemas/member");

module.exports.run = async (bot, message, args) => {
  const mem = await Member.findOne({ id: message.member.id });
  const top = await Member.find().sort({ invites: -1 }).limit(10);

  let num = await Member.find({ $gte: mem.invites }).countDocuments();
  if (mem) {
    const less = await Member.find({ $lte: mem.invites })
      .sort({ invites: -1 })
      .limit(2);
    var gr = await Member.find({ $gte: mem.invites })
      .sort({ invites: 1 })
      .limit(2);
    gr = gr.reverse();
  }

  let embed = new MessageEmbed()
    .setTitle("Топ по приглашениям")
    .setColor(message.member.displayHexColor);

  let y = 1;

  embed.addField(
    "Топ 10",
    top.map((x) => `${y++}. ${x.displayName} - ${x.invites} приглашений\n`)
  );

  let text = mem
    ? your.map((x) => `${y++}. ${x.displayName} - ${x.invites} приглашений\n`)
    : "Тебя нет в датабазе";

  if (mem) {
    var your = [...gr, mem, ...less];
    y = num - 2;
  }

  embed.addField("Твоя позиция", text);

  message.member.send({ embed: embed });
  message.delete();
};

module.exports.help = {
  name: "top",
};
