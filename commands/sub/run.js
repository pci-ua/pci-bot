'use strict';

module.exports = async ( interaction ) => {

	let [{name,options}] = interaction.options.data;

	try {
		await require(`./subCommand/${name}`)( interaction , options );
	} catch ( err ) {
		await interaction.reply( { content : 'Quelques ajustements sont en cours veuillez patienter merci !' , ephemeral : true } );
	}
}
