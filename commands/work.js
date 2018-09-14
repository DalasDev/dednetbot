const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://root:retrobot2018@ds239071.mlab.com:39071/retrobotdb");
var User = require('./../schemas/user_model.js');


function isNumeric(value) {
	return /^\d+$/.test(value);
}

function random(min, max) {
	var result = Math.floor(Math.random() * (max - min + 1)) + min;
	return (result);
}

module.exports.run = async (bot, message, args) => {

	console.log("1 " + message);
	console.log("2 " + message.channel);

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
					return message.reply("Ты слишком устал... Отдохни еще немного.");



				let toPay = random(1, 2);
				let newCash = foundObj.retrocoinCash + toPay;
				foundObj.retrocoinCash = newCash;
				foundObj.retrocoinTotal = foundObj.retrocoinBank + newCash;

				var answers = [];
				answers.push(`ты поработал на славу, но твой босс не в настроении, ты остался без зарплаты, но по дороге домой ты нашел ${toPay} :retric: !`);
				answers.push(`ты написал марио на C++, получи свою выручку ${toPay} :retric: !`);
				answers.push(`как насчет очередной кружки пива? -Конечно! К сожалению ты работаешь барменом... Получи свои ${toPay} :retric: !`);
				answers.push(`ты убрался дома у богача и свистнул у него ${toPay} :retric: !`);
				answers.push(`придя на работу тебя заставили мыть пол! Это были самые тяжелые ${toPay} :retric:  в твоей жизни...`);
				answers.push(`ты доставил пиццу в Полицейский участок Retro Valley! Ты получил респект и ${toPay} :retric: !`);
				answers.push(`переустановив Windows у бабушки ты получил ${toPay} :retric: !`);
				answers.push(`ты целый день рекламировал канал Sallywan-a и получил ${toPay} :retric: !`);
				answers.push(`тебя приняли на стажировку в бар но ты облажался! Получи свои ${toPay} :retric:  за день работы...`);
				answers.push(`ты целый день носил воду команде по баскетболу! Держи свои ${toPay} :retric: !`);
				answers.push(`продавая арбузы к тебе пришёл богач и скупил все арбузы! Твой босс сегодня добрый и дал тебе ${toPay} :retric: !`);
				answers.push(`ты записался на бой в зале на окраине города! И вот бой начинается! Бац-бац...Тебя вырубили. Получай свои ${toPay} :retric: !`);
				answers.push(`ты плавал в реке и нашёл новый iPhone XS. Продав его ты получил ${toPay} :retric: !`);
				answers.push(`ты развесил свою анкету "Хожу за вас на стрелки" на местный сайт разовых работ. Тебя позвали на стрелку. Ты отвесил люлей 5-классникам и получил ${toPay} :retric: !`);
				answers.push(`весь день ты позировал для первокурсников Художественного Университета и получил за это ${toPay} :retric: !`);
				answers.push(`ты снялся в порнографий и получил ${toPay} :retric: !`);
				answers.push(`ты помог чемпиону страны по карате подготовится к чемпионату! Ты с синяками но зато у тебя ${toPay} :retric: !`);
				answers.push(`простояв целый день в очереди за новым iPhone ты продал своё место! Тебе хочется плакать и у тебя болят ноги но ты заработал ${toPay} :retric: !`);
				answers.push(`ты устроился стажёром в Epic Games. Ты слил инфу Салливану про грядущие обновления. Тебя уволили но у тебя есть ${toPay} :retric:  и респект Салли!`);
				answers.push(`ты нарисовал портрет Салливана и продал его на Авито, получив ${toPay} :retric: !`);
				answers.push(`годы твоего обучения 3D-моделированию, редактированию и обработки видео не прошли зря. Ты создал новое интро для канала Салливана и заработал ${toPay} :retric: !`);
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
