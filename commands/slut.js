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

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports.run = async (bot, message, args) => {

	if(!message.member.roles.some(r=>["🍓Клубничный клуб🍓", "РетроТестер", "Тех. Администратор", "Губернатор"].includes(r.name)))
		return;

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

				var resultOfSlut = random(1, 100);

				var dateTime = Date.now();
				var timestamp = Math.floor(dateTime/1000);
				if (foundObj.lastSlutResult == true)
					var timestampLimit = Math.floor(foundObj.lastSlut/1000) + 54; //5400
				else
					var timestampLimit = Math.floor(foundObj.lastSlut/1000) + 18; //1800


				if (timestampLimit > timestamp)
					return message.reply(`твой дружок слишком устал... Отдохни еще немного, восстановись ${simpleIcon}`);

				var toPay = random(200, 600);

				var newCash = 0;
				if (resultOfSlut <= 40)
					newCash = foundObj.retrocoinCash + toPay;
				else{
					toPay = Math.floor(foundObj.retrocoinTotal / 100 * 15);
					newCash = foundObj.retrocoinCash - toPay;
				}

				foundObj.retrocoinCash = newCash;
				foundObj.retrocoinTotal = foundObj.retrocoinBank + newCash;
				foundObj.lastSlut = dateTime;

				var answers = [];
				answers.push(`ты пришёл к местному наркобарону и начал наяривать ему! Руки болят но ${numberWithCommas(toPay)} ${retricIcon} уже в кармане!`);
				answers.push(`бабушка вызвала мужа на час, но она вовсе не хотела чтобы ты ей чинил кран! Забирай свои ${numberWithCommas(toPay)} ${retricIcon}!`);
				answers.push(`тебе попался человек со странным вкусом который заставил тебя засовывать ему в задницу шнур...Держи свои ${numberWithCommas(toPay)} ${retricIcon}!`);
				answers.push(`ты пришёл в местный клуб карате. Как оказалось у тренера день рождения и они решили пустить тебя по кругу. Попка болит но ${numberWithCommas(toPay)} ${retricIcon} ты заработал!`);
				answers.push(`приехав на очередной вызов ты привёз с собой дилдо! Твоему клиенту понравился новый опыт. Бери ${numberWithCommas(toPay)} ${retricIcon}!`);
				answers.push(`твой рот хорошо поработал этой ночью, твой сутенер будет доволен и дал тебе за это ${numberWithCommas(toPay)} ${retricIcon}!`);
				answers.push(`ты пошел в клуб и позанимался сексом, тебе оставили ${numberWithCommas(toPay)} ${retricIcon}!`);
				answers.push(`ты вышел на трассу подзаработать, но ты избил шлюху и украл ${numberWithCommas(toPay)} ${retricIcon}!`);
				answers.push(`заняться ЭТИМ в туалете было немного стыдным, но главное что заплатили ${numberWithCommas(toPay)} ${retricIcon}!`);

				var answers2 =[];
				answers2.push(`ты пошел в клуб и позанимался сексом, ты забеременял и пошел сделал аборт за ${numberWithCommas(toPay)} ${retricIcon}`);
				answers2.push(`ты вышел на трасу подзаработать, но у тебя спёрла шлюха ${numberWithCommas(toPay)} ${retricIcon}`);
				answers2.push(`ты хотел новых ощущений, но посещение проктолога стоит ${numberWithCommas(toPay)} ${retricIcon}`);
				answers2.push(`твой дружок тебя подвел, по договору ты должен ${numberWithCommas(toPay)} ${retricIcon} сутенёру...`);
				answers2.push(`когда ты ехал за рулём, наяривая своему другу рукой, ты попал в аварию... За ремонт машины ты отдал ${numberWithCommas(toPay)} ${retricIcon}`);
				answers2.push(`ты подцепил на одном концерте девчонку, но у нее оказался ВИЧ. Теперь только по больницам гонять, последний осмотр обошелся в ${numberWithCommas(toPay)} ${retricIcon}`);
				answers2.push(`твоя "коллега" одолжила у тебя ${numberWithCommas(toPay)} ${retricIcon} пока вы работали на панели, но так и не вернула`);
				answers2.push(`ты думал тебе попалась мама Стифлера, а на самом деле Сьюзан Бойл! Еще и новую челюсть за ${numberWithCommas(toPay)} ${retricIcon} купить пришлось...`);


				if (resultOfSlut <= 40){
					var index = Math.floor((Math.random() * answers.length));
					var answer = answers[index];
					foundObj.lastSlutResult = true;
				}
				else {
					var index = Math.floor((Math.random() * answers2.length));
					var answer = answers2[index];
					foundObj.lastSlutResult = false;
				}

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
	name: "slut"
}