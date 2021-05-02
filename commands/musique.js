'use strict';

const MUSIQUE = require('../module/musique.js');

exports.init = MUSIQUE.init;

exports.run = (bot, message, args) => {
	switch( args[0] ) {
		case '-stop':
			MUSIQUE.stop( bot , message , args);
			break;

		case '-skip':
		case '-next':
			MUSIQUE.next( bot , message , args);
			break;

		case '-list':
			MUSIQUE.list( bot , message , args);
			break;

		case '-help':
		case '-aide':
			MUSIQUE.help( bot , message , args);
			break;

		case '-volume':
		case '-vol':
			break;

		default:
			MUSIQUE.play( bot , message , args );
	}
};

exports.config = {
	aliases: ["play","music"]
};

exports.help = {
	name:"MUSIQUE",
	description:"Permet sur serveur de joué de la musique",
	usage:"play <Musique name>"
};
