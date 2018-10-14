const Discord = require("discord.js");

//help

module.exports.run = async (bot, message, args) => {

	if(!message.member.roles.some(r=>["Тех. Администратор", "Губернатор"].includes(r.name)))
    	return;

//	.setImage("https://retrobotproject.herokuapp.com/images/bender.gif")
	const embed = new Discord.RichEmbed()
	.setImage("https://retrobotproject.herokuapp.com/images/selffive.gif")
	message.channel.send({embed});
	//message.channel.send("https://retrobotproject.herokuapp.com/images/selffive.gif");
}

module.exports.help = {
	name: "molodec"
}
