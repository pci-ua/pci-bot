let commands = {};

module.exports = ( interaction ) => {
	try {
		// On ne recupère les commandes que lorsqu'en en à besoin et ensuite on les mémorises
		if( commands[interaction.commandName] === undefined ) {
			commands[interaction.commandName] = require(`./commands/${interaction.commandName}.js`);
		}
		// Éxécution de la commande
		await commands[interaction.commandName]( interaction );
	} catch( err ) {
		console.error('bot : Erreur lors du traitement d une commande',{err,interaction});
	}
};
