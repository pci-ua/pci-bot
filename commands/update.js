const { readdir } = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const Token = require('./safety.js');

const rest = new REST({ version: '9' }).setToken( Token.get() );

// Mise à jours des SlashCommands
// <1> Récupération contenu dossier
new Promise( (resolve, reject) => {
	readdir( ('./') , {} , (err,liste) => {
		if( err ) {
			reject( err );
		} else {
			resolve( liste );
		}
	} );
} )
// <2> Envoie à Discord des formats
.then( listeFichier => rest.put(
	Routes.applicationGuildCommands(
		/* PC[bot] app ID */ 355029819249000459,
		/* PC[i] server ID */ 672022288476143636
	),
	{
		body: liste
			.filter( folderName => folderName.match( /^([0-9a-z_]+)$/ ) )
			.map( folderName => require(`./${folderName}/format.json`) )
	}
) )
// <3> Complétions des log
.then( () => console.log('SlashCommands updated ! ') )
// <E> Ajouts dans les log en cas d'erreur
.catch( (err) => console.error('Error while trying to update SlashCommands : ',{err}) )
