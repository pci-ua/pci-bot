let components = {};

module.exports = async ( interaction ) => {
	interaction.interactName = interaction.customId.split`_`[1];
	try {
		// On ne recupère les commandes que lorsqu'en en à besoin et ensuite on les mémorises
		if( components[interaction.interactName] === undefined ) {
			components[interaction.interactName] = require(`./${interaction.interactName}/run.js`);
		}
		// Éxécution de la commande
		await components[interaction.interactName]( interaction );
	} catch( err ) {
		console.error('bot : Erreur lors du traitement d une commande',{err,interaction});
	}
};
