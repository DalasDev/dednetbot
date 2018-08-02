const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = '!';


client.on('ready', () => {
    console.log('Bot started!');
});

client.on('message', message => {
    if (message.content === prefix +'test') {
    	message.reply('Бот работаетХахахах!');
  	}
});



// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
