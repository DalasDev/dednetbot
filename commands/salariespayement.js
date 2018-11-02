const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');
var Role = require('./../schemas/role_model.js');

function paysomeone(user_obj, role_obj){
  var user = User.findOne({
    userID: user_obj.userID
  }, function (err, foundObj) {
    if (err){
      console.log("Error on database findOne: " + err);
    }
    else {
      if (!foundObj)
        console.log("Something stange happend");
      else {
        foundObj.retrocoinBank += role_obj.salary;
        foundObj.save(function(err, updatedObj){
          if(err)
            console.log(err);
        });
      }
    }
  });
}

function findroleowners(role){

  var users = User.find().lean().exec(function(err, userstab) {

    if(err)
      console.log(err);
    else{      
      var maxY = userstab.length;
      var y = 0;
      var text = ``;
      while(y < maxY){
        if(userstab[y].roles.includes(role.roleID))
          paysomeone(userstab[y], role);
        y++;
      }
    }
  });
}

module.exports.run = async (bot) => {

  var roles = Role.find().lean().exec(function(err, rolestab) {
    if(err)
      console.log(err);
    else{      
      var maxX = rolestab.length;
      var x = 0;
      var text = ``;
      while(x < maxX){
        findroleowners(rolestab[x]);
        x++;
      }
    }
  });
}

module.exports.help = {
  name: "salariespayement"
}