const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Bot started!');
});

client.on('message', message => {
    if (message.content === 'test') {
    	message.reply('Bot is working!');
  	}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
