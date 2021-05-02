const ytdl = require('ytdl-core');
const musique_stop = require('./stop.js');

function musique_next( bot , msg , _ ) {
	try {
		if( bot.musique.playing ) {
			bot.musique.list.shift();
			if( bot.musique.list.length > 0 ) {
				bot.musique.flux.play(ytdl(bot.musique.list[0].link, { filter: 'audioonly' }))
					.on('finish', _ => musique_next( bot , null , null ) )
					.on('error',console.error)
				;
				msg ? msg.react('⏭️') : '' ;
			} else {
				musique_stop( bot , msg , null );
			}
		}
	} catch(e) {
		console.error("Erreur dans le fichier musique.js dans la fonction musique_next");
		console.error(e);
	}
}

module.exports = musique_next;