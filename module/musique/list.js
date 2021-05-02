
const ytdl = require('ytdl-core');

const musique_msg = require('./msg.js');

async function musique_list( bot , msg , _ ) {
	try {
		const nmbListe = bot.musique.list.length;
		if( bot.musique.playing && nmbListe > 0 ) {
			let message = musique_msg( 'Liste' );
			for(let i=0 ; i<Math.min( nmbListe , 12 ) ; i++) {
				if( bot.musique.list[i].info == null ) {
					let info = await ytdl.getInfo(bot.musique.list[i].link);
					let Duree = info.videoDetails.lengthSeconds;
					let Vue = info.videoDetails.viewCount;
					let Released = info.videoDetails.publishDate;
					bot.musique.list[i].info = '';
`
${info.videoDetails.title} - ${info.videoDetails.author.name}
${bot.musique.list[i].link}
${(Duree>3600)?(`${Math.floor(Duree/3600)}h`):``} ${(Duree>60)?(`${Math.floor(Duree/60)}:${Duree%60}`):`${Duree%60}s`} - ${Vue} vues - ${Released}
`;

				}
				message.addField( i || 'Maintenant' , bot.musique.list[i].info );
			}
			msg.reply(message);
		} else {
			msg.reply(
				musique_msg( 'Liste' )
					.addField( 'Rien' , `Aucune musique pour l'instant :(` )
			);
		}
	} catch(e) {
		console.error("Erreur dans le module musique fichier list.js");
		console.error(e);
	}
}

module.exports = musique_list;