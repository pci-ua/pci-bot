/********************
* PC[bot]
* Author : Matthew (aka apolloLemon), Mathieu T. (aka StrategeFirst)
* Authors contact : unknown, mathieu.toulon@free.fr
* Release date : Not yet
* Version : 0.0.1
********************/

//Libraire
const Discord 		= require('discord.js');
const fs = require('fs');

//Contenu séparé
const Token 		= require('safety.js');
const SuperLoger 	= require('superLog.js');

//Initialisation du bot
const bot = new Discord.Client();

//Librairire
bot.discord = require('discord.js');
bot.message	= require('preMadeMessage.js');
bot.club = require('clubManager.js');

//Constante
// A voir pour mettre dans un fichier de config en .json qui serait dans le gitignore, un fichier config.json.template pourrai être intégrée dans le dépot
bot.prefix  = '?';
bot.pingRoleChannelId = '770040260415193108';
bot.ID_message_d_inscription = 770255995091419176; // <<< c'est ici qu'il faut inséré l'identifiant du message d'inscription
bot.Verif_inscription = ['Doctorant','alu','ens'];
bot.Accept_inscription = ['L1','L2','L3','L3Pro','M1'];

const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

//Variable global
let connected = false;
let lastCrash = 0;

// On stock les commandes , les aliases et les events dans des Collections
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.events = new Discord.Collection();

bot.loadCommands = () =>
{
	bot.commands.clear();
	bot.aliases.clear();

	// On lit tout le dossier commands , un fichier correspond à une commande
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

bot.loadEvents = () =>
{
	bot.events.clear();

	// Pareil que pour les commande, un fichier correspond à un event
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

// Basic events handler
bot.on('ready', ready => {
	connected = true;
	SuperLoger.log('Démarrer');
	bot.user.setActivity('vos demandes: ' + bot.prefix + 'aide' , {'type': 'LISTENING'});
});

bot.on('disconnect', (errorMessage, code) => {
	SuperLoger.log('Crash',errorMessage,code);
	connected = false;

	let now = new Date();
	if(now - lastCrash > 600000 /* Dernier crash il y a plus de 10 minutes en ms */) {
		setTimeout(LogOn, 2500);
	}
});

bot.on('raw', async packet => {
    //packet.t = type de packet
    //packet.d = data du packet ( donnée )
    if( events[ packet.t ] ) { //si on à définie l'évenement dans ceux à écouté
        bot.emit( events[ packet.t ], packet.d );
    }
});

function LogOn() {
	// On charge les commandes et les events
	bot.loadCommands();
	bot.loadEvents();

	bot.login(Token.get());
}

if( ! connected ) {
	LogOn();
}

function messageSurServeur( message ) { return message.guild !== null; }
