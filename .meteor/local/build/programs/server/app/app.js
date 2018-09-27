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

  const botconfig = require("../botconfig.json");

  const Discord = require("discord.js");

  const fs = require("fs");

  const bot = new Discord.Client({
    disableEveryone: true
  });

  const ms = require("ms");

  var CronJob = require('cron').CronJob;

  bot.commands = new Discord.Collection(); //  mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");

  fs.readdir("../commands", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");

    if (jsfile.length <= 0) {
      console.log("[app.js] Команды не найдены");
      return;
    }

    jsfile.forEach((f, i) => {
      let props = require(`../commands/${f}`);

      console.log(`[app.js] Комманда ${f} загружена`);
      bot.commands.set(props.help.name, props);
    });
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL2FwcC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUxIiwibW9kdWxlIiwiTWV0ZW9yIiwid2F0Y2giLCJyZXF1aXJlIiwidiIsIm9uUGFnZUxvYWQiLCJzdGFydHVwIiwiY29uc29sZSIsImxvZyIsImlkIiwiYm90Y29uZmlnIiwiRGlzY29yZCIsImZzIiwiYm90IiwiQ2xpZW50IiwiZGlzYWJsZUV2ZXJ5b25lIiwibXMiLCJDcm9uSm9iIiwiY29tbWFuZHMiLCJDb2xsZWN0aW9uIiwicmVhZGRpciIsImVyciIsImZpbGVzIiwianNmaWxlIiwiZmlsdGVyIiwiZiIsInNwbGl0IiwicG9wIiwibGVuZ3RoIiwiZm9yRWFjaCIsImkiLCJwcm9wcyIsInNldCIsImhlbHAiLCJuYW1lIiwiaWRsZV9yZXBlYXQiLCJjcm9uaW5kZXgiLCJvbiIsInVzZXIiLCJ1c2VybmFtZSIsInNldFByZXNlbmNlIiwiZ2FtZSIsInR5cGUiLCJtZXNzYWdlIiwiYXV0aG9yIiwibWVtYmVyIiwicm9sZXMiLCJzb21lIiwiciIsImluY2x1ZGVzIiwiY2hhbm5lbCIsImRlbGV0ZSIsInRoZW4iLCJtc2ciLCJjYXRjaCIsImVycm9yIiwicHJlZml4IiwiY29udGVudCIsImNoYXJBdCIsIm1lc3NhZ2VBcnJheSIsImNtZCIsImFyZ3MiLCJzbGljZSIsImNvbW1hbmRmaWxlIiwiZ2V0IiwicnVuIiwibG9naW4iLCJwcm9jZXNzIiwiZW52IiwiQk9UX1RPS0VOIiwic2luayIsInJlbmRlckludG9FbGVtZW50QnlJZCIsIkRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsTUFBTUEsVUFBUUMsTUFBZDtBQUFxQixJQUFJQyxNQUFKO0FBQVdGLFFBQVFHLEtBQVIsQ0FBY0MsUUFBUSxlQUFSLENBQWQsRUFBdUM7QUFBQ0YsU0FBT0csQ0FBUCxFQUFTO0FBQUNILGFBQU9HLENBQVA7QUFBUzs7QUFBcEIsQ0FBdkMsRUFBNkQsQ0FBN0Q7QUFBZ0UsSUFB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QUFFQSxVQUFHbUMsV0FBSCxFQUFlO0FBQ2JBLG9CQUFZRSxHQUFaLENBQWdCcEQsR0FBaEIsRUFBcUI4QixPQUFyQixFQUE4QmtCLElBQTlCO0FBQ0Q7QUFDRixLQVZJLE1BV0E7QUFDSCxVQUFJRCxNQUFNLFVBQVY7QUFDQSxVQUFJRyxjQUFjbEQsSUFBSUssUUFBSixDQUFhOEMsR0FBYixDQUFpQkosR0FBakIsQ0FBbEI7O0FBQ0EsVUFBR0csV0FBSCxFQUFlO0FBQ2JBLG9CQUFZRSxHQUFaLENBQWdCcEQsR0FBaEIsRUFBcUI4QixPQUFyQjtBQUNEO0FBQ0Y7QUFDRixHQXZFaUIsQ0FBbEI7QUF5RUE5QixNQUFJcUQsS0FBSixDQUFVQyxRQUFRQyxHQUFSLENBQVlDLFNBQXRCO0FBR0QsQ0F2SUQ7QUF5SUFoRSxXQUFXaUUsUUFBUTtBQUNqQjtBQUNBQSxPQUFLQyxxQkFBTCxDQUNFLHNCQURGLEVBRUcsZ0JBQWUsSUFBSUMsSUFBSixFQUFTLEVBRjNCO0FBSUQsQ0FORCxFIiwiZmlsZSI6Ii9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IHsgb25QYWdlTG9hZCB9IGZyb20gXCJtZXRlb3Ivc2VydmVyLXJlbmRlclwiO1xuXG5NZXRlb3Iuc3RhcnR1cCgoKSA9PiB7XG4gIC8vIENvZGUgdG8gcnVuIG9uIHNlcnZlciBzdGFydHVwLlxuICBjb25zb2xlLmxvZyhgR3JlZXRpbmdzIGZyb20gJHttb2R1bGUuaWR9IWApO1xuXG4gIGNvbnN0IGJvdGNvbmZpZyA9IHJlcXVpcmUoXCIuLi9ib3Rjb25maWcuanNvblwiKTtcbiAgY29uc3QgRGlzY29yZCA9IHJlcXVpcmUoXCJkaXNjb3JkLmpzXCIpO1xuICBjb25zdCBmcyA9IHJlcXVpcmUoXCJmc1wiKTtcbiAgY29uc3QgYm90ID0gbmV3IERpc2NvcmQuQ2xpZW50KHtkaXNhYmxlRXZlcnlvbmU6IHRydWV9KTtcbiAgY29uc3QgbXMgPSByZXF1aXJlKFwibXNcIik7XG4gIHZhciBDcm9uSm9iID0gcmVxdWlyZSgnY3JvbicpLkNyb25Kb2I7XG4gIGJvdC5jb21tYW5kcyA9IG5ldyBEaXNjb3JkLkNvbGxlY3Rpb24oKTtcblxuLy8gIG1vbmdvb3NlLlByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTttb25nb29zZS5jb25uZWN0KFwibW9uZ29kYjovL3Jvb3Q6cmV0cm9ib3QyMDE4QGRzMjM5MDcxLm1sYWIuY29tOjM5MDcxL3JldHJvYm90ZGJcIik7XG5cbiAgZnMucmVhZGRpcihcIi4uL2NvbW1hbmRzXCIsIChlcnIsIGZpbGVzKSA9PiB7XG4gICAgaWYgKGVycilcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgbGV0IGpzZmlsZSA9IGZpbGVzLmZpbHRlcihmID0+IGYuc3BsaXQoXCIuXCIpLnBvcCgpID09PSBcImpzXCIpO1xuICAgIGlmIChqc2ZpbGUubGVuZ3RoIDw9IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiW2FwcC5qc10g0JrQvtC80LDQvdC00Ysg0L3QtSDQvdCw0LnQtNC10L3Ri1wiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBqc2ZpbGUuZm9yRWFjaCgoZiwgaSkgPT4ge1xuICAgICAgbGV0IHByb3BzID0gcmVxdWlyZShgLi4vY29tbWFuZHMvJHtmfWApO1xuICAgICAgY29uc29sZS5sb2coYFthcHAuanNdINCa0L7QvNC80LDQvdC00LAgJHtmfSDQt9Cw0LPRgNGD0LbQtdC90LBgKTtcbiAgICAgIGJvdC5jb21tYW5kcy5zZXQocHJvcHMuaGVscC5uYW1lLCBwcm9wcyk7XG4gICAgfSlcbiAgfSlcblxuICBmdW5jdGlvbiBpZGxlX3JlcGVhdCgpe1xuICAgIGNvbnNvbGUubG9nKFwiW2FwcC5qc10gTmV3IENyb25Kb2Igc3RhcnRlZFwiKTtcblxuICAgIHZhciBjcm9uaW5kZXggPSAxO1xuICAgIHZhciBDcm9uSm9iID0gcmVxdWlyZSgnY3JvbicpLkNyb25Kb2I7XG4gICAgbmV3IENyb25Kb2IoJzAgKiAqICogKiAqJywgZnVuY3Rpb24oKSB7XG4gICAgICBsZXQgaSA9IChjcm9uaW5kZXggPT0gMSkgPyBcIiBtaW51dGVcIiA6IFwiIG1pbnV0ZXNcIjtcbiAgICAgIGNvbnNvbGUubG9nKFwiW2FwcC5qc10gQ3JvbkpvYjogQm90IGlzIG9ubGluZSBmb3IgXCIgKyBjcm9uaW5kZXggKyBpKTtcbiAgICAgIGNyb25pbmRleCsrO1xuICAgIH0sIG51bGwsIHRydWUsICdFdXJvcGUvUGFyaXMnKTtcbiAgICAvLyBTZWNvbmRzOiAwLTU5XG4gICAgLy8gTWludXRlczogMC01OVxuICAgIC8vIEhvdXJzOiAwLTIzXG4gICAgLy8gRGF5IG9mIE1vbnRoOiAxLTMxXG4gICAgLy8gTW9udGhzOiAwLTExIChKYW4tRGVjKVxuICAgIC8vIERheSBvZiBXZWVrOiAwLTYgKFN1bi1TYXQpXG4gIH1cblxuICBib3Qub24oXCJyZWFkeVwiLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coYFthcHAuanNdICR7Ym90LnVzZXIudXNlcm5hbWV9INC+0L3Qu9Cw0LnQvWApO1xuICAgIGJvdC51c2VyLnNldFByZXNlbmNlKHtcbiAgICAgIGdhbWU6IHtcbiAgICAgICAgbmFtZTogXCLQt9CwIFJldHJvIFZhbGxleSFcIixcbiAgICAgICAgdHlwZTogM1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlkbGVfcmVwZWF0KCk7XG4gIH0pO1xuXG4gIGJvdC5vbihcIm1lc3NhZ2VcIiwgYXN5bmMgbWVzc2FnZSA9PiB7XG5cbiAgICBpZihtZXNzYWdlLmF1dGhvci5ib3Qpe1xuICAgICAgaWYobWVzc2FnZS5tZW1iZXIgIT0gbnVsbCl7XG4gICAgICAgIGlmKG1lc3NhZ2UubWVtYmVyLnJvbGVzLnNvbWUocj0+W1wiTWFudGFyb1wiXS5pbmNsdWRlcyhyLm5hbWUpKSl7XG4gICAgICAgICAgaWYobWVzc2FnZS5jaGFubmVsLm5hbWUgPT0gXCLwn5O10LrQsNC90LDQu9C40LfQsNGG0LjRj1wiKXtcbiAgICAgICAgICAgIG1lc3NhZ2UuZGVsZXRlKClcbiAgICAgICAgICAgIC50aGVuKG1zZyA9PiBjb25zb2xlLmxvZyhg0KPQtNCw0LvQtdC90L4g0YHQvtC+0LHRidC10L3QuNC1INC+0YIgJHttc2cuYXV0aG9yLnVzZXJuYW1lfWApKVxuICAgICAgICAgICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmKG1lc3NhZ2UuY2hhbm5lbC50eXBlID09PSBcImRtXCIpXG4gICAgICByZXR1cm47XG5cbiAgICBsZXQgcHJlZml4ID0gYm90Y29uZmlnLnByZWZpeDtcbiAgICBpZiAobWVzc2FnZS5jb250ZW50LmNoYXJBdCgwKSA9PT0gcHJlZml4KXtcbiAgICAgIGxldCBtZXNzYWdlQXJyYXkgPSBtZXNzYWdlLmNvbnRlbnQuc3BsaXQoXCIgXCIpO1xuICAgICAgbGV0IGNtZCA9IG1lc3NhZ2VBcnJheVswXTtcbiAgICAgIGxldCBhcmdzID0gbWVzc2FnZUFycmF5LnNsaWNlKDEpO1xuICAgICAgbGV0IGNvbW1hbmRmaWxlID0gYm90LmNvbW1hbmRzLmdldChjbWQuc2xpY2UocHJlZml4Lmxlbmd0aCkpO1xuXG4gICAgICBpZihjb21tYW5kZmlsZSl7XG4gICAgICAgIGNvbW1hbmRmaWxlLnJ1bihib3QsIG1lc3NhZ2UsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChtZXNzYWdlLmNvbnRlbnQuY2hhckF0KDApID09PSBcIiFcIiAmJiBtZXNzYWdlLmNvbnRlbnQuY2hhckF0KDEpID09PSBcIndcIiAmJiBtZXNzYWdlLmNvbnRlbnQuY2hhckF0KDIpID09PSBcImFcIlxuICAgICAmJiBtZXNzYWdlLmNvbnRlbnQuY2hhckF0KDMpID09PSBcInJcIiAmJiBtZXNzYWdlLmNvbnRlbnQuY2hhckF0KDQpID09PSBcIm5cIil7XG4gICAgICBsZXQgbWVzc2FnZUFycmF5ID0gbWVzc2FnZS5jb250ZW50LnNwbGl0KFwiIFwiKTtcbiAgICAgIGxldCBjbWQgPSBcIiF3YXJuMlwiO1xuICAgICAgbGV0IGFyZ3MgPSBtZXNzYWdlQXJyYXkuc2xpY2UoMSk7XG4gICAgICBsZXQgY29tbWFuZGZpbGUgPSBib3QuY29tbWFuZHMuZ2V0KGNtZC5zbGljZShwcmVmaXgubGVuZ3RoKSk7XG5cbiAgICAgIGlmKGNvbW1hbmRmaWxlKXtcbiAgICAgICAgY29tbWFuZGZpbGUucnVuKGJvdCwgbWVzc2FnZSwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKG1lc3NhZ2UuY29udGVudC5jaGFyQXQoMCkgPT09IFwiP1wiICYmIG1lc3NhZ2UuY29udGVudC5jaGFyQXQoMSkgPT09IFwic1wiICYmIG1lc3NhZ2UuY29udGVudC5jaGFyQXQoMikgPT09IFwiZVwiXG4gICAgICYmIG1lc3NhZ2UuY29udGVudC5jaGFyQXQoMykgPT09IFwibFwiICYmIG1lc3NhZ2UuY29udGVudC5jaGFyQXQoNCkgPT09IFwibFwiICYmIG1lc3NhZ2UuY29udGVudC5jaGFyQXQoNSkgPT09IFwiLVwiXG4gICAgICYmIG1lc3NhZ2UuY29udGVudC5jaGFyQXQoNikgPT09IFwiaVwiICYmIG1lc3NhZ2UuY29udGVudC5jaGFyQXQoNykgPT09IFwidFwiICYmIG1lc3NhZ2UuY29udGVudC5jaGFyQXQoOCkgPT09IFwiZVwiXG4gICAgICYmIG1lc3NhZ2UuY29udGVudC5jaGFyQXQoOSkgPT09IFwibVwiKXtcbiAgICAgIGxldCBtZXNzYWdlQXJyYXkgPSBtZXNzYWdlLmNvbnRlbnQuc3BsaXQoXCIgXCIpO1xuICAgICAgbGV0IGNtZCA9IFwiIXNlbGxzY2FuXCI7XG4gICAgICBsZXQgYXJncyA9IG1lc3NhZ2VBcnJheS5zbGljZSgxKTtcbiAgICAgIGxldCBjb21tYW5kZmlsZSA9IGJvdC5jb21tYW5kcy5nZXQoY21kLnNsaWNlKHByZWZpeC5sZW5ndGgpKTtcblxuICAgICAgaWYoY29tbWFuZGZpbGUpe1xuICAgICAgICBjb21tYW5kZmlsZS5ydW4oYm90LCBtZXNzYWdlLCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAobWVzc2FnZS5jb250ZW50LmNoYXJBdCgwKSA9PT0gXCI/XCIgJiYgbWVzc2FnZS5jb250ZW50LmNoYXJBdCgxKSA9PT0gXCJzXCIgJiYgbWVzc2FnZS5jb250ZW50LmNoYXJBdCgyKSA9PT0gXCJlXCJcbiAgICAgJiYgbWVzc2FnZS5jb250ZW50LmNoYXJBdCgzKSA9PT0gXCJsXCIgJiYgbWVzc2FnZS5jb250ZW50LmNoYXJBdCg0KSA9PT0gXCJsXCIpe1xuICAgICAgbGV0IG1lc3NhZ2VBcnJheSA9IG1lc3NhZ2UuY29udGVudC5zcGxpdChcIiBcIik7XG4gICAgICBsZXQgY21kID0gXCIhc2VsbHNjYW5cIjtcbiAgICAgIGxldCBhcmdzID0gbWVzc2FnZUFycmF5LnNsaWNlKDEpO1xuICAgICAgbGV0IGNvbW1hbmRmaWxlID0gYm90LmNvbW1hbmRzLmdldChjbWQuc2xpY2UocHJlZml4Lmxlbmd0aCkpO1xuXG4gICAgICBpZihjb21tYW5kZmlsZSl7XG4gICAgICAgIGNvbW1hbmRmaWxlLnJ1bihib3QsIG1lc3NhZ2UsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxldCBjbWQgPSBcInNjYW51c2VyXCI7XG4gICAgICBsZXQgY29tbWFuZGZpbGUgPSBib3QuY29tbWFuZHMuZ2V0KGNtZCk7XG4gICAgICBpZihjb21tYW5kZmlsZSl7XG4gICAgICAgIGNvbW1hbmRmaWxlLnJ1bihib3QsIG1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgYm90LmxvZ2luKHByb2Nlc3MuZW52LkJPVF9UT0tFTik7XG5cblxufSk7XG5cbm9uUGFnZUxvYWQoc2luayA9PiB7XG4gIC8vIENvZGUgdG8gcnVuIG9uIGV2ZXJ5IHJlcXVlc3QuXG4gIHNpbmsucmVuZGVySW50b0VsZW1lbnRCeUlkKFxuICAgIFwic2VydmVyLXJlbmRlci10YXJnZXRcIixcbiAgICBgU2VydmVyIHRpbWU6ICR7bmV3IERhdGV9YFxuICApO1xufSk7XG4iXX0=
