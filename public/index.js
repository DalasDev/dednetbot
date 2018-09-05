const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const express = require('express');
const app = express();
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

function warnings() {
	console.log("Warns: " + warns);
	let to_show = JSON.stringify(warns);
	document.getElementById("warns").innerHTML = to_show;
}