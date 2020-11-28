var { MessageEmbed } = require("discord.js");
var bin = require("hastebin-gen");
module.exports.run = async (bot, message, args) => {
  if (
    ![
      "358212316975726603",
      "354261484395560961",
      "432098760030552074",
    ].includes(message.member.id)
  )
    return;
  function clean(text) {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  }

  try {
    const code = args.join(" ");
    let evaled = eval(code);

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
    if (evaled === "Promise { <pending> }") return;
    message.react("✅");
    if (clean(evaled).length > 2000) {
      bin(clean(evaled), { extension: "js" }).then((link) => {
        message.channel.send(link).catch(() => {});
      });
      return;
    }
    var emb = new MessageEmbed()
      .setTitle("Результат")
      .setDescription(`\`\`\`js` + "\n" + clean(evaled) + `\n` + `\`\`\``)
      .setColor("#f2b");
    message.channel.send(emb).catch(() => {});
  } catch (err) {
    message.react("⚠");
    var emb = new MessageEmbed()
      .setTitle("Результат")
      .setDescription(`\`\`\`js` + "\n" + clean(err) + `\n` + `\`\`\``)
      .setColor("#f2b");
    message.channel.send(emb).catch(() => {});
  }
};

module.exports.help = {
  name: "eval",
};
