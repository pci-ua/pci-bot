'use strict';
const DATA = require('./data.json');

module.exports = async ( interaction ) => {
	await interaction.reply( {
		content: DATA.reponses[ Math.floor( Math.random() * DATA.reponses.length ) ]
	} );
}
