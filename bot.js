/********************
* PC[bot]
* Author : Matthew (aka apolloLemon), Mathieu T. (aka StrategeFirst)
* Authors contact : unknown, mathieu.toulon@free.fr
* Release date : 25/10/2020
* Last update : 24/11/2021
* Version : 3.0.0
********************/

//Librairies externes
const { Client, Intents, Collection } = require('discord.js');
const { readdir } = require('fs');

//Contenus séparés
const Token = require('./safety.js');
const SuperLoger = require('./superLog.js');

//Initialisation du bot
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//Librairies internes
bot.discord = require('discord.js');
bot.message = require('./preMadeMessage.js');
bot.club = require('./clubManager.js');

//Constantes
bot.config = require('./config.json');

//Variables globales
let connected = false;

process.beginTimeStamp = new Date();

// On stock les commandes , les aliases et les events dans des Collections
bot.events = new Collection();

//On prépare les commandes chat du bot

//On prépare les événements du bot
bot.loadEvents = () =>
{
	// - on vide la liste des événements géré
	bot.events.clear();

	// - pour chaque fichier du dossier 'events' on créé une capture d'un événement
	readdir('./events/', (err, files) => {
		if (err) console.log(err);
		files.forEach(file => {
			delete require.cache[require.resolve(`./events/${file}`)];
			let eventFunc = require(`./events/${file}`);
			let eventName = file.split(".")[0];
			bot.on(eventName, (...args) => eventFunc.run(bot, ...args));
		});
	});
}

// Quand le bot est correctement connecté
bot.on('ready', ready => {
	connected = true;
	SuperLoger.log('Démarrer');
	bot.user.setActivity('vos demandes: ' + bot.config.prefix + 'aide' , {'type': 'LISTENING'});
	for(let command of bot.commands) (command[1].init) ? (command[1].init(bot)) : '';
});

// Si bot ce fait déconnecté
bot.on('disconnect', (errorMessage, code) => {
	SuperLoger.log('Crash',errorMessage,code);
	connected = false;

	let now = new Date();
	if(now - lastCrash > 600000 /* Dernier crash il y a plus de 10 minutes en ms */) {
		setTimeout(LogOn, 2500);
	}
});

// Attrape tous les événements et transmet sous conditions
bot.on('raw', async packet => {
	//packet.t = type de packet
	//packet.d = data du packet ( donnée )
	if( bot.config.events[ packet.t ] ) { //si on a définie l'évenement dans ceux à écouté
		bot.emit( bot.config.events[ packet.t ], packet.d );
	}
});

// Lancement du bot
function LogOn() {
	bot.loadCommands();
	bot.loadEvents();

	bot.login(Token.get());
}
if( ! connected ) {
	LogOn();
}

//Fonction annexe pour racourci
function messageSurServeur( message ) { return message.guild !== null; }


bot.on('interactionCreate', interaction => {
	switch (interaction.type) {
		case 'APPLICATION_COMMAND': require('./command/')( interaction );

			break;
		default:
			console.warn( `unknown interaction type : ${interaction.type}! ` );
	}
}
