const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = '!';

client.on('ready', () => {
    console.log('Bot started!');
});

client.on('message', message => {
    if (message.content === prefix +'test') {
    	message.reply('Бот работает!');
  	}
});

//!Kick @Member Why?

let cmd = MessageArray[0];

if(cmd === `kick`){
    
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Tiime", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "kick-list");
    if(!kickChannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
