function musique_stop( bot , msg , _ ) {
	try {
		if( bot.musique.playing ) {
			bot.musique.flux.disconnect();
			bot.musique.list = [];
			bot.musique.playing = false;
			bot.musique.flux = null;
			msg ? msg.react('🛑') : '' ;
		}
	} catch(e) {
		console.error("Erreur dans le fichier musique.js dans la fonction musique_stop");
		console.error(e);
	}
}

module.exports = musique_stop;