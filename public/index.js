const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const express = require('express');
const app = express();

function warnings() {
   document.getElementById("warns").innerHTML = "Warns will be showed here";
}