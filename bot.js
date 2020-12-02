/********************
* PC[bot]
* Author : Matthew (aka apolloLemon), Mathieu T. (aka StrategeFirst)
* Authors contact : unknown, mathieu.toulon@free.fr
* Release date : 25/10/2020
* Last update : 02/12/2020
* Version : 2.2.1
********************/

//Librairies externes
const Discord = require('discord.js');
const fs = require('fs');

//Contenus séparés
const Token = require('safety.js');
const SuperLoger = require('superLog.js');

//Initialisation du bot
const bot = new Discord.Client();

//Librairies internes
bot.discord = require('discord.js');
bot.message = require('preMadeMessage.js');
bot.club = require('clubManager.js');

//Constantes
bot.prefix = '?';
bot.pingRoleChannelId = '770040260415193108';
bot.ID_message_d_inscription = 770255995091419176;
bot.Verif_inscription = ['Doctorant','alu','ens','ext'];
bot.Accept_inscription = ['L1','L2','L3','L3Pro','M1'];

//Événements géré
const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

//Variables globales
let connected = false;
let lastCrash = 0;

bot.beginTimeStamp = new Date();

// On stock les commandes , les aliases et les events dans des Collections
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.events = new Discord.Collection();

//On prépare les commandes chat du bot
bot.loadCommands = () =>
{
	// - on vide les commandes et alias
	bot.commands.clear();
	bot.aliases.clear();

	// - pour chaque fichier du dossier 'commands' on créé une commande
	fs.readdir("./commands/", (err, files) => {
		if (err) return console.log(err);
		files.forEach(file => {
			if (!file.endsWith(".js")) return;
			delete require.cache[require.resolve(`./commands/${file}`)];
			let props = require(`./commands/${file}`);
			let commandName = file.split(".")[0];
			bot.commands.set(commandName, props);

			if(props.config)
			{
				if(props.config.aliases)
				{
					props.config.aliases.forEach(alias => {
						bot.aliases.set(alias, props);
					});
				}
			}
		});
	});
}

//On prépare les événements du bot
bot.loadEvents = () =>
{
	// - on vide la liste des événements géré
	bot.events.clear();

	// - pour chaque fichier du dossier 'events' on créé une capture d'un événement
	fs.readdir('./events/', (err, files) => {
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
	bot.user.setActivity('vos demandes: ' + bot.prefix + 'aide' , {'type': 'LISTENING'});
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
	if( events[ packet.t ] ) { //si on a définie l'évenement dans ceux à écouté
		bot.emit( events[ packet.t ], packet.d );
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
