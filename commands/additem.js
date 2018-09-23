const Discord = require("discord.js");
const fs = require("fs");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var Item = require('./../schemas/shop_model.js');

module.exports.run = async (bot, message, args) => {

  //лимит который нужно прописать во все комманды что бы никто другой пока что не использовал
  if(!message.member.hasPermission("MANAGE_ROLES"))
    return;
  if(!message.member.roles.some(r=>["Тех. Администратор", "Губернатор"].includes(r.name)))
    return;
  console.log("Content: " + message.cleanContent);
  itm = message.cleanContent.split('"', 1).pop();
  console.log("Item name: " + itm);
  if(!args[4])
    return message.reply(`name price U(+/-) S(+/-) D(+/-)`);
  if(args[5])
    return message.reply('что то не так...');
  var ifU = (args[2] == '+') ? true : false;
  var ifS = (args[3] == '+') ? true : false;
  var ifD = (args[4] == '+') ? true : false;
  var newItem = new Item({
    itemName: args[0],
    itemPrice: Number(args[1]),
    usable: ifU,
    sellable: ifS,
    deletable: ifD,
    created: Date.now()
  });
  newItem.save()
  .then(item => {
    console.log('New item "'+args[0]+'" added to database');
  })
  .catch(err => {
    console.log("Error on database save: " + err);
  });
  return message.reply(`"${args[0]}" добавлено в магазин`);
}

module.exports.help = {
  name: "additem"
}
