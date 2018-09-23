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
  var itm = "";
  if(message.cleanContent.indexOf('"') > -1){
    itm = message.cleanContent.split('"', 2).pop();
    console.log("Item name: " + itm);
  }
  else
    itm = args[0];
  if(!args[4])
    return message.reply(`name price U(+/-) S(+/-) D(+/-)`);
  var ifU = (args[2] == '+') ? true : false;
  var ifS = (args[3] == '+') ? true : false;
  var ifD = (args[4] == '+') ? true : false;
  var newItem = new Item({
    itemName: itm,
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
