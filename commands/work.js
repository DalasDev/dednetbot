const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect(process.env.MONGO_URL);
var User = require('./../schemas/user_model.js');


function isNumeric(value) {
	return /^\d+$/.test(value);
}

function random(min, max) {
	var result = Math.floor(Math.random() * (max - min + 1)) + min;
	return (result);
}

module.exports.run = async (bot, message, args) => {

	var retricIcon = bot.emojis.find("name", "retric");
	var simpleIcon = bot.emojis.find("name", "this_is_simple");

	var user_obj = User.findOne({
		userID: message.member.id
	}, function (err, foundObj) {
		if (err){
			console.log("Error on database findOne: " + err);
		}
		else {
			if (!foundObj)
				console.log("Something stange happend");
			else {

				var dateTime = Date.now();
				var timestamp = Math.floor(dateTime/1000);
				var timestampLimit = Math.floor(foundObj.lastWork/1000) + 900;

				if (timestampLimit > timestamp)
					return message.reply(`ты слишком устал... Отдохни еще немного, работать можно раз в 15 минут ${simpleIcon}`);

				let toPay = random(75, 200);
				let newCash = foundObj.retrocoinCash + toPay;
				foundObj.retrocoinCash = newCash;
				foundObj.retrocoinTotal = foundObj.retrocoinBank + newCash;
				foundObj.lastWork = dateTime;

				var answers = [];
				answers.push(`ты поработал на славу, но твой босс не в настроении, ты остался без зарплаты, но по дороге домой ты нашел ${toPay} ${retricIcon}!`);
				answers.push(`ты написал марио на C++, получи свою выручку ${toPay} ${retricIcon}!`);
				answers.push(`как насчет очередной кружки пива? -Конечно! К сожалению ты работаешь барменом... Получи свои ${toPay} ${retricIcon}!`);
				answers.push(`ты убрался дома у богача и свистнул у него ${toPay} ${retricIcon}!`);
				answers.push(`придя на работу тебя заставили мыть пол! Это были самые тяжелые ${toPay} ${retricIcon} в твоей жизни...`);
				answers.push(`ты доставил пиццу в Полицейский участок Retro Valley! Ты получил респект и ${toPay} ${retricIcon}!`);
				answers.push(`переустановив Windows у бабушки ты получил ${toPay} ${retricIcon}!`);
				answers.push(`ты целый день рекламировал канал Sallywan-a и получил ${toPay} ${retricIcon}!`);
				answers.push(`тебя приняли на стажировку в бар но ты облажался! Получи свои ${toPay} ${retricIcon} за день работы...`);
				answers.push(`ты целый день носил воду команде по баскетболу! Держи свои ${toPay} ${retricIcon}!`);
				answers.push(`продавая арбузы к тебе пришёл богач и скупил все арбузы! Твой босс сегодня добрый и дал тебе ${toPay} ${retricIcon}!`);
				answers.push(`ты записался на бой в зале на окраине города! И вот бой начинается! Бац-бац...Тебя вырубили. Получай свои ${toPay} ${retricIcon}!`);
				answers.push(`ты плавал в реке и нашёл новый iPhone XS. Продав его ты получил ${toPay} ${retricIcon}!`);
				answers.push(`ты развесил свою анкету "Хожу за вас на стрелки" на местный сайт разовых работ. Тебя позвали на стрелку. Ты отвесил люлей 5-классникам и получил ${toPay} ${retricIcon}!`);
				answers.push(`весь день ты позировал для первокурсников Художественного Университета и получил за это ${toPay} ${retricIcon}!`);
				answers.push(`ты снялся в порнографии и получил ${toPay} ${retricIcon}!`);
				answers.push(`ты помог чемпиону страны по карате подготовится к чемпионату! Ты с синяками но зато у тебя ${toPay} ${retricIcon}!`);
				answers.push(`простояв целый день в очереди за новым iPhone ты продал своё место! Тебе хочется плакать и у тебя болят ноги но ты заработал ${toPay} ${retricIcon}!`);
				answers.push(`ты устроился стажёром в Epic Games. Ты слил инфу Салливану про грядущие обновления. Тебя уволили но у тебя есть ${toPay} ${retricIcon} и респект Салли!`);
				answers.push(`ты нарисовал портрет Салливана и продал его на Авито, получив ${toPay} ${retricIcon}!`);
				answers.push(`годы твоего обучения 3D-моделированию, редактированию и обработки видео не прошли зря. Ты создал новое интро для канала Салливана и заработал ${toPay} ${retricIcon}!`);
				let index = Math.floor((Math.random() * answers.length));
				let answer = answers[index];

				message.reply(answer);

				foundObj.save(function(err, updatedObj){
				if(err)
					console.log(err);
				});
			}
		}
	});
}

module.exports.help = {
	name: "work"
}
