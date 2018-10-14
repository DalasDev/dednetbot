const Discord = require("discord.js");

//help

module.exports.run = async (bot, message, args) => {

	if(!message.member.roles.some(r=>["Тех. Администратор", "Губернатор"].includes(r.name)))
    	return;

	const embed = new Discord.RichEmbed()
	.setImage("https://retrobotproject.herokuapp.com/images/selffive.gif")
	message.channel.send({embed});
}

module.exports.help = {
	name: "molodec"
}
