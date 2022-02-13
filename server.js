require('dotenv').config();
require('./custom-log.js');

if( ['dev','test','prod'].indexOf( process.env.ENV ) === -1 ) throw `${process.env.ENV} is not a valid enviroment !`;

const fs = require('fs');
const { Client, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const rest = new REST({ version: '9' }).setToken( process.env.DISCORD_TOKEN );

bot.on('ready', () => console.log('bot : Ready !') );
bot.login(process.env.DISCORD_TOKEN);

bot.sondages = {};

// Mise à jour des commandes
new Promise( (resolve, reject) => {
	fs.readdir( './commands/' , {} , (_,liste) =>
		rest.put(
			Routes.applicationGuildCommands(
				process.env.DISCORD_APPLICATION_ID,
				(
					( process.env.ENV==='prod' )
					?
					process.env.DISCORD_SERVER_RELEASE_ID
					:
					process.env.DISCORD_SERVER_TEST_ID
				)
			),
			{ body: liste.map( fichier => require(`./commands/${fichier}/syntax.json`) ) }
		)
		.then( function() {
			resolve()
		} )
		.catch( function(err) {
			reject(err)
		} )
	)
})
.then( () => console.log( 'SlashCommands updated !' ) )
.catch( (err) => { console.error('SlashCommands an error occured during command syntax update ! ',err); } )

let commands = {};
let interaction = {};

bot.on('interactionCreate', async interaction => {
	if( interaction.type == 'APPLICATION_COMMAND' ) {
		console.log(`SlashCommand ${interaction.commandName} ask by ${interaction.member}` );
		if( commands[interaction.commandName] === undefined ) {
			commands[interaction.commandName] = require(`./commands/${interaction.commandName}/run.js`);
		}
		try {
			await commands[interaction.commandName](interaction,bot);
		} catch( err ) {
			console.error('Interaction Erreur lors du traitement d une commande',{err,interaction});
		}
	} else if( interaction.type == 'MESSAGE_COMPONENT' ) {
		let interactionName = interaction.customId.split`_`[0];
		if( interaction[interactionName] === undefined ) {
			interaction[interactionName] = require(`./interaction/${interactionName}.js`);
		}
		try {
			await interaction[interactionName](interaction,bot);
		} catch ( err ) {
			console.log('Interaction Erreur lors du traitement d une interaction',{err,interaction});
		}
	}
} );

//////

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('/data/db');

db.serialize(function() {
	db.run('CREATE TABLE IF NOT EXISTS pcicoin (discord_id TEXT PRIMARY KEY, amount INTEGER)');
});

/////

process.db = db;
process.bot = bot;
