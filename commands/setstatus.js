const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.roles.some(r=>["Discord NPC Developer", "God Father"].includes(r.name)))
    return;

  message.delete().catch(O_o=>{});

  let bstatus = args[0];
  if(!bstatus)
    return message.reply("статус не указан!");

  //if(status == "online" || status == "idle" || status == "invisible" || status == "invis" || status == "dnd")


  if(bstatus == 'online'){
    bot.user.setStatus('online');

  }else if(bstatus == 'idle'){
    bot.user.setStatus('idle');

  }else if(bstatus == 'invisible' || bstatus == 'invis'){
    bot.user.setStatus('invisible');

  }else if(bstatus == 'dnd'){
    bot.user.setStatus('dnd');

  }else{
    return message.reply("не верный статус! (online/idle/invis/dnd)");
  }

}

module.exports.help = {
	name: "setstatus"
}
