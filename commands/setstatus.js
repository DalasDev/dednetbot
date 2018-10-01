const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

	//лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
  // if(!message.member.hasPermission("MANAGE_MESSAGES"))
  //   return;

  if(!message.member.roles.some(r=>["Тех. Администратор", "Губернатор"].includes(r.name)))
    return;

  message.delete().catch(O_o=>{});

  let status = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  if(status == "online" || status == "idle" || status == "invisible" || status == "invis" || status == "dnd"){

    if(status == "online"){
        bot.user.setStatus('online');
    }

    if(status == "idle"){
        bot.user.setStatus('idle');
    }

    if(status == "invisible" || status == "invis"){
        bot.user.setStatus('invisible');
    }

    if(status == "dnd"){
        bot.user.setStatus('dnd');
    }

  }else{
      message.reply("ввведите статус (online/idle/invis/dnd)");
  }
}

module.exports.help = {
	name: "setstatus"
}
