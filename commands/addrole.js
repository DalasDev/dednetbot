//!addrole @member role

const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let repchannel = message.guild.channels.find(`name`, "🌘reports_bots");
	let errorschannel = message.guild.channels.find(`name`, "🌏errors_bots");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  let role = args.join(" ").slice(22);
  let gRole = message.guild.roles.find(`name`, role);

  if(!message.member.hasPermission("MANAGE_ROLES"))
    return message.reply("похоже у тебя недостаточно на это прав, дружище :thinking:.");
  if(!rMember)
    return message.reply("пользователь не существует!");
  if(!role)
    return message.reply("укажите роль!");
  if(!gRole)

    var answers = [];
    answers.push(`неее...пусть меня мотопес лучше тестит`);
    answers.push(`а сали разрешение дал?`);
    answers.push(`видно не судьба`);
    answers.push(`неее...не хочу чтоб ты меня тестил`);
    answers.push(`ты моего родного JS не знаешь! Куда тебе в тестеры`);
    answers.push(`а ты секреты держать умеешь?`);
    answers.push(`говорю же, не судьба!`);
    answers.push(`сотый раз говорю не судьба!`);
    answers.push(`а ты жаваскрипт знаешь?`);
    answers.push(`навалом тестеров уже...куда тебе`);
    let index = Math.floor((Math.random() * answers.length));
    let answer = answers[index];

    message.reply(answer);

  if(!errorschannel)
		return message.channel.send("Канал ошибок не существует!");
	if(!repchannel)
		errorschannel.send("Канал репортов не существует!");
	if(!repchannel)
		return message.channel.send("Канал репортов не существует!");
  if(rMember.roles.has(gRole.id))
    return message.reply("у него уже есть эта роль!");
  await(rMember.addRole(gRole.id));

  message.channel.send(`<@${rMember.id}> получил роль ${gRole.name}! :ok_hand:`);
  repchannel.send(`<@${rMember.id}> получил роль ${gRole.name}! :ok_hand:`);

}

module.exports.help = {
  name: "addrole"
}
