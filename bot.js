const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = '!';

let messageArray = message.content.split(" ");
let cmd = messageArray[0];
let args = messageArray.slice(10);

client.on('ready', () => {
    console.log('Bot started!');
});

client.on('message', message => {
    if (message.content === prefix +'test') {
    	message.reply('Бот работает!');
  	}
});



// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
