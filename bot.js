/********************
* PC[bot]
* Author : Matthew (aka apolloLemon), Mathieu T. (aka StrategeFirst)
* Authors contact : unknown, mathieu.toulon@free.fr
* Release date : 25/10/2020
* Last update : 24/11/2021
* Version : 3.1.0
********************/

process.beginTimeStamp = new Date();

// Ajout de fonctionnalité custom :
require('./custom/');

// Bibliothèques
const { Client, Intents } = require('discord.js');

// Initialisation du bot
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const Token = require('./safety.js');

bot.discord = require('discord.js');
bot.config = require('./config.json');
bot.events = require('./events');
 
// Lancement
bot.events(bot);
bot.login(Token.get());