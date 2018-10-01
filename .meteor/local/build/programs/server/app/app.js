var require = meteorInstall({"server":{"app.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// server/app.js                                                                    //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
const module1 = module;
let Meteor;
module1.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let onPageLoad;
module1.watch(require("meteor/server-render"), {
  onPageLoad(v) {
    onPageLoad = v;
  }

}, 1);
Meteor.startup(() => {
  // Code to run on server startup.
  console.log(`Greetings from ${module.id}!`);
  console.log("DB1");

  const botconfig = require("../botconfig.json");

  const Discord = require("discord.js");

  const fs = require("fs");

  const bot = new Discord.Client({
    disableEveryone: true
  });

  const ms = require("ms");

  var CronJob = require('cron').CronJob;

  bot.commands = new Discord.Collection();
  console.log("DB2"); //  mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");

  fs.readdir("/commands", (err, files) => {
    console.log("DB3");
    if (err) console.log(err);else console.log("Files: " + files);
    console.log("DB4");

    if (typeof files !== 'undefined') {
      var jsfile = files.filter(f => f.split(".").pop() === "js");
    }

    console.log("DB5");

    if (jsfile && jsfile.length <= 0) {
      console.log("[app.js] Команды не найдены");
      return;
    }

    console.log("DB6");
    jsfile.forEach((f, i) => {
      let props = require(`../commands/${f}`);

      console.log(`[app.js] Комманда ${f} загружена`);
      bot.commands.set(props.help.name, props);
    });
    console.log("DB7");
  });

  function idle_repeat() {
    console.log("[app.js] New CronJob started");
    var cronindex = 1;

    var CronJob = require('cron').CronJob;

    new CronJob('0 * * * * *', function () {
      let i = cronindex == 1 ? " minute" : " minutes";
      console.log("[app.js] CronJob: Bot is online for " + cronindex + i);
      cronindex++;
    }, null, true, 'Europe/Paris'); // Seconds: 0-59
    // Minutes: 0-59
    // Hours: 0-23
    // Day of Month: 1-31
    // Months: 0-11 (Jan-Dec)
    // Day of Week: 0-6 (Sun-Sat)
  }

  bot.on("ready", () => Promise.asyncApply(() => {
    console.log(`[app.js] ${bot.user.username} онлайн`);
    bot.user.setPresence({
      game: {
        name: "за Retro Valley!",
        type: 3
      }
    });
    idle_repeat();
  }));
  bot.on("message", message => Promise.asyncApply(() => {
    if (message.author.bot) {
      if (message.member != null) {
        if (message.member.roles.some(r => ["Mantaro"].includes(r.name))) {
          if (message.channel.name == "📵канализация") {
            message.delete().then(msg => console.log(`Удалено сообщение от ${msg.author.username}`)).catch(console.error);
          }
        }
      }

      return;
    }

    if (message.channel.type === "dm") return;
    let prefix = botconfig.prefix;

    if (message.content.charAt(0) === prefix) {
      let messageArray = message.content.split(" ");
      let cmd = messageArray[0];
      let args = messageArray.slice(1);
      let commandfile = bot.commands.get(cmd.slice(prefix.length));

      if (commandfile) {
        commandfile.run(bot, message, args);
      }
    } else if (message.content.charAt(0) === "!" && message.content.charAt(1) === "w" && message.content.charAt(2) === "a" && message.content.charAt(3) === "r" && message.content.charAt(4) === "n") {
      let messageArray = message.content.split(" ");
      let cmd = "!warn2";
      let args = messageArray.slice(1);
      let commandfile = bot.commands.get(cmd.slice(prefix.length));

      if (commandfile) {
        commandfile.run(bot, message, args);
      }
    } else if (message.content.charAt(0) === "?" && message.content.charAt(1) === "s" && message.content.charAt(2) === "e" && message.content.charAt(3) === "l" && message.content.charAt(4) === "l" && message.content.charAt(5) === "-" && message.content.charAt(6) === "i" && message.content.charAt(7) === "t" && message.content.charAt(8) === "e" && message.content.charAt(9) === "m") {
      let messageArray = message.content.split(" ");
      let cmd = "!sellscan";
      let args = messageArray.slice(1);
      let commandfile = bot.commands.get(cmd.slice(prefix.length));

      if (commandfile) {
        commandfile.run(bot, message, args);
      }
    } else if (message.content.charAt(0) === "?" && message.content.charAt(1) === "s" && message.content.charAt(2) === "e" && message.content.charAt(3) === "l" && message.content.charAt(4) === "l") {
      let messageArray = message.content.split(" ");
      let cmd = "!sellscan";
      let args = messageArray.slice(1);
      let commandfile = bot.commands.get(cmd.slice(prefix.length));

      if (commandfile) {
        commandfile.run(bot, message, args);
      }
    } else {
      let cmd = "scanuser";
      let commandfile = bot.commands.get(cmd);

      if (commandfile) {
        commandfile.run(bot, message);
      }
    }
  }));
  bot.login(process.env.BOT_TOKEN);
});
onPageLoad(sink => {
  // Code to run on every request.
  sink.renderIntoElementById("server-render-target", `Server time: ${new Date()}`);
});
//////////////////////////////////////////////////////////////////////////////////////

}},"botconfig.json":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// botconfig.json                                                                   //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
module.exports = {
  "prefix": "^"
};

//////////////////////////////////////////////////////////////////////////////////////

}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
var exports = require("/server/app.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL2FwcC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUxIiwibW9kdWxlIiwiTWV0ZW9yIiwid2F0Y2giLCJyZXF1aXJlIiwidiIsIm9uUGFnZUxvYWQiLCJzdGFydHVwIiwiY29uc29sZSIsImxvZyIsImlkIiwiYm90Y29uZmlnIiwiRGlzY29yZCIsImZzIiwiYm90IiwiQ2xpZW50IiwiZGlzYWJsZUV2ZXJ5b25lIiwibXMiLCJDcm9uSm9iIiwiY29tbWFuZHMiLCJDb2xsZWN0aW9uIiwicmVhZGRpciIsImVyciIsImZpbGVzIiwianNmaWxlIiwiZmlsdGVyIiwiZiIsInNwbGl0IiwicG9wIiwibGVuZ3RoIiwiZm9yRWFjaCIsImkiLCJwcm9wcyIsInNldCIsImhlbHAiLCJuYW1lIiwiaWRsZV9yZXBlYXQiLCJjcm9uaW5kZXgiLCJvbiIsInVzZXIiLCJ1c2VybmFtZSIsInNldFByZXNlbmNlIiwiZ2FtZSIsInR5cGUiLCJtZXNzYWdlIiwiYXV0aG9yIiwibWVtYmVyIiwicm9sZXMiLCJzb21lIiwiciIsImluY2x1ZGVzIiwiY2hhbm5lbCIsImRlbGV0ZSIsInRoZW4iLCJtc2ciLCJjYXRjaCIsImVycm9yIiwicHJlZml4IiwiY29udGVudCIsImNoYXJBdCIsIm1lc3NhZ2VBcnJheSIsImNtZCIsImFyZ3MiLCJzbGljZSIsImNvbW1hbmRmaWxlIiwiZ2V0IiwicnVuIiwibG9naW4iLCJwcm9jZXNzIiwiZW52IiwiQk9UX1RPS0VOIiwic2luayIsInJlbmRlckludG9FbGVtZW50QnlJZCIsIkRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsTUFBTUEsVUFBUUMsTUFBZDtBQUFxQixJQUFJQyxNQUFKO0FBQVdGLFFBQVFHLEtBQVIsQ0FBY0MsUUFBUSxlQUFSLENBQWQsRUFBdUM7QUFBQ0YsU0FBT0csQ0FBUCxFQUFTO0FBQUNILGFBQU9HLENBQVA7QUFBUzs7QUFBcEIsQ0FBdkMsRUFBNkQsQ0FBN0Q7QUFBZ0UsSUFB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QUR6QixJQUNnQ2YsUUFBUWMsT0FBUixDQUFnQkMsTUFBaEIsQ0FBdUIsQ0FBdkIsTUFBOEIsR0FEbEUsRUFDc0U7QUFDekUsVUFBSUMsZUFBZWhCLFFBQVFjLE9BQVIsQ0FBZ0IvQixLQUFoQixDQUFzQixHQUF0QixDQUFuQjtBQUNBLFVBQUlrQyxNQUFNLFdBQVY7QUFDQSxVQUFJQyxPQUFPRixhQUFhRyxLQUFiLENBQW1CLENBQW5CLENBQVg7QUFDQSxVQUFJQyxjQUFjbEQsSUFBSUssUUFBSixDQUFhOEMsR0FBYixDQUFpQkosSUFBSUUsS0FBSixDQUFVTixPQUFPNUIsTUFBakIsQ0FBakIsQ0FBbEI7O0FBRUEsVUFBR21DLFdBQUgsRUFBZTtBQUNiQSxvQkFBWUUsR0FBWixDQUFnQnBELEdBQWhCLEVBQXFCOEIsT0FBckIsRUFBOEJrQixJQUE5QjtBQUNEO0FBQ0YsS0FWSSxNQVdBO0FBQ0gsVUFBSUQsTUFBTSxVQUFWO0FBQ0EsVUFBSUcsY0FBY2xELElBQUlLLFFBQUosQ0FBYThDLEdBQWIsQ0FBaUJKLEdBQWpCLENBQWxCOztBQUNBLFVBQUdHLFdBQUgsRUFBZTtBQUNiQSxvQkFBWUUsR0FBWixDQUFnQnBELEdBQWhCLEVBQXFCOEIsT0FBckI7QUFDRDtBQUNGO0FBQ0YsR0F2RWlCLENBQWxCO0FBeUVBOUIsTUFBSXFELEtBQUosQ0FBVUMsUUFBUUMsR0FBUixDQUFZQyxTQUF0QjtBQUdELENBbkpEO0FBcUpBaEUsV0FBV2lFLFFBQVE7QUFDakI7QUFDQUEsT0FBS0MscUJBQUwsQ0FDRSxzQkFERixFQUVHLGdCQUFlLElBQUlDLElBQUosRUFBUyxFQUYzQjtBQUlELENBTkQsRSIsImZpbGUiOiIvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSBcIm1ldGVvci9tZXRlb3JcIjtcbmltcG9ydCB7IG9uUGFnZUxvYWQgfSBmcm9tIFwibWV0ZW9yL3NlcnZlci1yZW5kZXJcIjtcblxuTWV0ZW9yLnN0YXJ0dXAoKCkgPT4ge1xuICAvLyBDb2RlIHRvIHJ1biBvbiBzZXJ2ZXIgc3RhcnR1cC5cbiAgY29uc29sZS5sb2coYEdyZWV0aW5ncyBmcm9tICR7bW9kdWxlLmlkfSFgKTtcblxuICBjb25zb2xlLmxvZyhcIkRCMVwiKTtcblxuICBjb25zdCBib3Rjb25maWcgPSByZXF1aXJlKFwiLi4vYm90Y29uZmlnLmpzb25cIik7XG4gIGNvbnN0IERpc2NvcmQgPSByZXF1aXJlKFwiZGlzY29yZC5qc1wiKTtcbiAgY29uc3QgZnMgPSByZXF1aXJlKFwiZnNcIik7XG4gIGNvbnN0IGJvdCA9IG5ldyBEaXNjb3JkLkNsaWVudCh7ZGlzYWJsZUV2ZXJ5b25lOiB0cnVlfSk7XG4gIGNvbnN0IG1zID0gcmVxdWlyZShcIm1zXCIpO1xuICB2YXIgQ3JvbkpvYiA9IHJlcXVpcmUoJ2Nyb24nKS5Dcm9uSm9iO1xuICBib3QuY29tbWFuZHMgPSBuZXcgRGlzY29yZC5Db2xsZWN0aW9uKCk7XG4gIGNvbnNvbGUubG9nKFwiREIyXCIpO1xuXG5cbi8vICBtb25nb29zZS5Qcm9taXNlID0gZ2xvYmFsLlByb21pc2U7bW9uZ29vc2UuY29ubmVjdChcIm1vbmdvZGI6Ly9yb290OnJldHJvYm90MjAxOEBkczIzOTA3MS5tbGFiLmNvbTozOTA3MS9yZXRyb2JvdGRiXCIpO1xuXG4gIGZzLnJlYWRkaXIoXCIvY29tbWFuZHNcIiwgKGVyciwgZmlsZXMpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIkRCM1wiKTtcbiAgICBpZiAoZXJyKVxuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICBlbHNlXG4gICAgICBjb25zb2xlLmxvZyhcIkZpbGVzOiBcIiArIGZpbGVzKTtcbiAgICBjb25zb2xlLmxvZyhcIkRCNFwiKTtcbiAgICBpZih0eXBlb2YgZmlsZXMgIT09ICd1bmRlZmluZWQnKXtcbiAgICAgIHZhciBqc2ZpbGUgPSBmaWxlcy5maWx0ZXIoZiA9PiBmLnNwbGl0KFwiLlwiKS5wb3AoKSA9PT0gXCJqc1wiKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJEQjVcIik7XG4gICAgaWYgKGpzZmlsZSAmJiBqc2ZpbGUubGVuZ3RoIDw9IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiW2FwcC5qc10g0JrQvtC80LDQvdC00Ysg0L3QtSDQvdCw0LnQtNC10L3Ri1wiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJEQjZcIik7XG4gICAganNmaWxlLmZvckVhY2goKGYsIGkpID0+IHtcbiAgICAgIGxldCBwcm9wcyA9IHJlcXVpcmUoYC4uL2NvbW1hbmRzLyR7Zn1gKTtcbiAgICAgIGNvbnNvbGUubG9nKGBbYXBwLmpzXSDQmtC+0LzQvNCw0L3QtNCwICR7Zn0g0LfQsNCz0YDRg9C20LXQvdCwYCk7XG4gICAgICBib3QuY29tbWFuZHMuc2V0KHByb3BzLmhlbHAubmFtZSwgcHJvcHMpO1xuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKFwiREI3XCIpO1xuICB9KVxuXG4gIGZ1bmN0aW9uIGlkbGVfcmVwZWF0KCl7XG4gICAgY29uc29sZS5sb2coXCJbYXBwLmpzXSBOZXcgQ3JvbkpvYiBzdGFydGVkXCIpO1xuXG4gICAgdmFyIGNyb25pbmRleCA9IDE7XG4gICAgdmFyIENyb25Kb2IgPSByZXF1aXJlKCdjcm9uJykuQ3JvbkpvYjtcbiAgICBuZXcgQ3JvbkpvYignMCAqICogKiAqIConLCBmdW5jdGlvbigpIHtcbiAgICAgIGxldCBpID0gKGNyb25pbmRleCA9PSAxKSA/IFwiIG1pbnV0ZVwiIDogXCIgbWludXRlc1wiO1xuICAgICAgY29uc29sZS5sb2coXCJbYXBwLmpzXSBDcm9uSm9iOiBCb3QgaXMgb25saW5lIGZvciBcIiArIGNyb25pbmRleCArIGkpO1xuICAgICAgY3JvbmluZGV4Kys7XG4gICAgfSwgbnVsbCwgdHJ1ZSwgJ0V1cm9wZS9QYXJpcycpO1xuICAgIC8vIFNlY29uZHM6IDAtNTlcbiAgICAvLyBNaW51dGVzOiAwLTU5XG4gICAgLy8gSG91cnM6IDAtMjNcbiAgICAvLyBEYXkgb2YgTW9udGg6IDEtMzFcbiAgICAvLyBNb250aHM6IDAtMTEgKEphbi1EZWMpXG4gICAgLy8gRGF5IG9mIFdlZWs6IDAtNiAoU3VuLVNhdClcbiAgfVxuXG4gIGJvdC5vbihcInJlYWR5XCIsIGFzeW5jICgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhgW2FwcC5qc10gJHtib3QudXNlci51c2VybmFtZX0g0L7QvdC70LDQudC9YCk7XG4gICAgYm90LnVzZXIuc2V0UHJlc2VuY2Uoe1xuICAgICAgZ2FtZToge1xuICAgICAgICBuYW1lOiBcItC30LAgUmV0cm8gVmFsbGV5IVwiLFxuICAgICAgICB0eXBlOiAzXG4gICAgICB9XG4gICAgfSk7XG4gICAgaWRsZV9yZXBlYXQoKTtcbiAgfSk7XG5cbiAgYm90Lm9uKFwibWVzc2FnZVwiLCBhc3luYyBtZXNzYWdlID0+IHtcblxuICAgIGlmKG1lc3NhZ2UuYXV0aG9yLmJvdCl7XG4gICAgICBpZihtZXNzYWdlLm1lbWJlciAhPSBudWxsKXtcbiAgICAgICAgaWYobWVzc2FnZS5tZW1iZXIucm9sZXMuc29tZShyPT5bXCJNYW50YXJvXCJdLmluY2x1ZGVzKHIubmFtZSkpKXtcbiAgICAgICAgICBpZihtZXNzYWdlLmNoYW5uZWwubmFtZSA9PSBcIvCfk7XQutCw0L3QsNC70LjQt9Cw0YbQuNGPXCIpe1xuICAgICAgICAgICAgbWVzc2FnZS5kZWxldGUoKVxuICAgICAgICAgICAgLnRoZW4obXNnID0+IGNvbnNvbGUubG9nKGDQo9C00LDQu9C10L3QviDRgdC+0L7QsdGJ0LXQvdC40LUg0L7RgiAke21zZy5hdXRob3IudXNlcm5hbWV9YCkpXG4gICAgICAgICAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYobWVzc2FnZS5jaGFubmVsLnR5cGUgPT09IFwiZG1cIilcbiAgICAgIHJldHVybjtcblxuICAgIGxldCBwcmVmaXggPSBib3Rjb25maWcucHJlZml4O1xuICAgIGlmIChtZXNzYWdlLmNvbnRlbnQuY2hhckF0KDApID09PSBwcmVmaXgpe1xuICAgICAgbGV0IG1lc3NhZ2VBcnJheSA9IG1lc3NhZ2UuY29udGVudC5zcGxpdChcIiBcIik7XG4gICAgICBsZXQgY21kID0gbWVzc2FnZUFycmF5WzBdO1xuICAgICAgbGV0IGFyZ3MgPSBtZXNzYWdlQXJyYXkuc2xpY2UoMSk7XG4gICAgICBsZXQgY29tbWFuZGZpbGUgPSBib3QuY29tbWFuZHMuZ2V0KGNtZC5zbGljZShwcmVmaXgubGVuZ3RoKSk7XG5cbiAgICAgIGlmKGNvbW1hbmRmaWxlKXtcbiAgICAgICAgY29tbWFuZGZpbGUucnVuKGJvdCwgbWVzc2FnZSwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKG1lc3NhZ2UuY29udGVudC5jaGFyQXQoMCkgPT09IFwiIVwiICYmIG1lc3NhZ2UuY29udGVudC5jaGFyQXQoMSkgPT09IFwid1wiICYmIG1lc3NhZ2UuY29udGVudC5jaGFyQXQoMikgPT09IFwiYVwiXG4gICAgICYmIG1lc3NhZ2UuY29udGVudC5jaGFyQXQoMykgPT09IFwiclwiICYmIG1lc3NhZ2UuY29udGVudC5jaGFyQXQoNCkgPT09IFwiblwiKXtcbiAgICAgIGxldCBtZXNzYWdlQXJyYXkgPSBtZXNzYWdlLmNvbnRlbnQuc3BsaXQoXCIgXCIpO1xuICAgICAgbGV0IGNtZCA9IFwiIXdhcm4yXCI7XG4gICAgICBsZXQgYXJncyA9IG1lc3NhZ2VBcnJheS5zbGljZSgxKTtcbiAgICAgIGxldCBjb21tYW5kZmlsZSA9IGJvdC5jb21tYW5kcy5nZXQoY21kLnNsaWNlKHByZWZpeC5sZW5ndGgpKTtcblxuICAgICAgaWYoY29tbWFuZGZpbGUpe1xuICAgICAgICBjb21tYW5kZmlsZS5ydW4oYm90LCBtZXNzYWdlLCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAobWVzc2FnZS5jb250ZW50LmNoYXJBdCgwKSA9PT0gXCI/XCIgJiYgbWVzc2FnZS5jb250ZW50LmNoYXJBdCgxKSA9PT0gXCJzXCIgJiYgbWVzc2FnZS5jb250ZW50LmNoYXJBdCgyKSA9PT0gXCJlXCJcbiAgICAgJiYgbWVzc2FnZS5jb250ZW50LmNoYXJBdCgzKSA9PT0gXCJsXCIgJiYgbWVzc2FnZS5jb250ZW50LmNoYXJBdCg0KSA9PT0gXCJsXCIgJiYgbWVzc2FnZS5jb250ZW50LmNoYXJBdCg1KSA9PT0gXCItXCJcbiAgICAgJiYgbWVzc2FnZS5jb250ZW50LmNoYXJBdCg2KSA9PT0gXCJpXCIgJiYgbWVzc2FnZS5jb250ZW50LmNoYXJBdCg3KSA9PT0gXCJ0XCIgJiYgbWVzc2FnZS5jb250ZW50LmNoYXJBdCg4KSA9PT0gXCJlXCJcbiAgICAgJiYgbWVzc2FnZS5jb250ZW50LmNoYXJBdCg5KSA9PT0gXCJtXCIpe1xuICAgICAgbGV0IG1lc3NhZ2VBcnJheSA9IG1lc3NhZ2UuY29udGVudC5zcGxpdChcIiBcIik7XG4gICAgICBsZXQgY21kID0gXCIhc2VsbHNjYW5cIjtcbiAgICAgIGxldCBhcmdzID0gbWVzc2FnZUFycmF5LnNsaWNlKDEpO1xuICAgICAgbGV0IGNvbW1hbmRmaWxlID0gYm90LmNvbW1hbmRzLmdldChjbWQuc2xpY2UocHJlZml4Lmxlbmd0aCkpO1xuXG4gICAgICBpZihjb21tYW5kZmlsZSl7XG4gICAgICAgIGNvbW1hbmRmaWxlLnJ1bihib3QsIG1lc3NhZ2UsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChtZXNzYWdlLmNvbnRlbnQuY2hhckF0KDApID09PSBcIj9cIiAmJiBtZXNzYWdlLmNvbnRlbnQuY2hhckF0KDEpID09PSBcInNcIiAmJiBtZXNzYWdlLmNvbnRlbnQuY2hhckF0KDIpID09PSBcImVcIlxuICAgICAmJiBtZXNzYWdlLmNvbnRlbnQuY2hhckF0KDMpID09PSBcImxcIiAmJiBtZXNzYWdlLmNvbnRlbnQuY2hhckF0KDQpID09PSBcImxcIil7XG4gICAgICBsZXQgbWVzc2FnZUFycmF5ID0gbWVzc2FnZS5jb250ZW50LnNwbGl0KFwiIFwiKTtcbiAgICAgIGxldCBjbWQgPSBcIiFzZWxsc2NhblwiO1xuICAgICAgbGV0IGFyZ3MgPSBtZXNzYWdlQXJyYXkuc2xpY2UoMSk7XG4gICAgICBsZXQgY29tbWFuZGZpbGUgPSBib3QuY29tbWFuZHMuZ2V0KGNtZC5zbGljZShwcmVmaXgubGVuZ3RoKSk7XG5cbiAgICAgIGlmKGNvbW1hbmRmaWxlKXtcbiAgICAgICAgY29tbWFuZGZpbGUucnVuKGJvdCwgbWVzc2FnZSwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbGV0IGNtZCA9IFwic2NhbnVzZXJcIjtcbiAgICAgIGxldCBjb21tYW5kZmlsZSA9IGJvdC5jb21tYW5kcy5nZXQoY21kKTtcbiAgICAgIGlmKGNvbW1hbmRmaWxlKXtcbiAgICAgICAgY29tbWFuZGZpbGUucnVuKGJvdCwgbWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBib3QubG9naW4ocHJvY2Vzcy5lbnYuQk9UX1RPS0VOKTtcblxuXG59KTtcblxub25QYWdlTG9hZChzaW5rID0+IHtcbiAgLy8gQ29kZSB0byBydW4gb24gZXZlcnkgcmVxdWVzdC5cbiAgc2luay5yZW5kZXJJbnRvRWxlbWVudEJ5SWQoXG4gICAgXCJzZXJ2ZXItcmVuZGVyLXRhcmdldFwiLFxuICAgIGBTZXJ2ZXIgdGltZTogJHtuZXcgRGF0ZX1gXG4gICk7XG59KTtcbiJdfQ==
