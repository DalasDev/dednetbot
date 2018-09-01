const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err)
    console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("No commands found");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`Комманда ${f} загружена`);
    bot.commands.set(props.help.name, props);
  })
})

bot.on("ready", async () => {
  console.log(`${bot.user.username} онлайн!`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));

  if(commandfile)
    commandfile.run(bot, message, args);

/*
  //tempmute @member Time
  
  if(cmd === `${prefix}tempmute`){

      let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!tomute) return message.reply("Пользователь не существует!");
      if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Этот пользователь не может быть замучен!");
      let muterole = message.guild.roles.find(`name`, "Наручники (Мут чата)");

      if(!muterole) return errorschannel.send("Роль мута не найдена!");

      let mutetime = args[1];
      if(!mutetime) return message.reply("Вы не указали время мута!");

      let repchannel = message.guild.channels.find(`name`, "reports");
      let errorschannel = message.guild.channels.find(`name`, "errors");
      if(!repchannel) return errorschannel.send("Канал отчетов не существует!");

      await(tomute.addRole(muterole.id));
      message.channel.send(`<@${tomute.id}> был замучен  на ${ms(ms(mutetime))}`);

      setTimeout(function(){
        tomute.removeRole(muterole.id);
        repchannel.send(`<@${tomute.id}> был размучен!`);
      }, ms(mutetime));

      return;
}

*/

});

bot.login(process.env.BOT_TOKEN);
