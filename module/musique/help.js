/*
	Génere le message d'aide pour la musique du bot
*/

const musique_msg = require('./msg.js');	// Permet de générer des messages embed discord rapidement

function musique_help( bot , msg , _ ) {
	try {
		msg.reply(
			musique_msg( 'Aide' )
				.addField( '-stop' , `Stop la lecture en cour`)
				.addField( '-next' , `Passe directement à la musique suivante`)
				.addField( '-list' , `Affiche la liste des musiques à venirs`)
				.addField( '-help' , `Affiche cet aide`)
				.addField( '<URL Youtube>' , `Joue la musique du lien youtube`)
				.addField( '<Du texte>' , `Joue une musique basé sur le texte inséré`)
		);
	} catch (e) {
		console.error("Erreur dans le module musique fichier help.js");
		console.error(e);
	}
}

module.exports = musique_help;