const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = '!';

client.on('ready', () => {
    console.log('Bot started!');
});

client.on('message', message => {
    if (message.content === prefix +'test') {
    	message.reply('Bot is working!');
  	}
  
 client.on('message', message => {
    if (message.content === prefix +'selfkick') {
        .kick (${member});
    }
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
