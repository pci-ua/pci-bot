const musique_find = require('./find.js');
const musique_next = require('./next.js');

async function musique_play( bot , msg , args ) {
	try {
		if( ! msg.channel.guild ) {
			return msg.reply( 'Ces commandes sont disponibles uniquement sur le serveur ! :(');
		}
		let salonVocal = msg.channel.guild.member(msg.author.id).voice;
		if(salonVocal && salonVocal.channel) {
			if( bot.musique.playing ) {
				if( bot.musique.channelID != salonVocal.channelID) {
					return msg.reply( 'Je suis déjà occupé dans un autre salon ! désolé :( ');
				}
			} else {
				bot.musique.playing = true;
				bot.musique.list = [];
				bot.musique.channelID = salonVocal.channelID;
				try {
					bot.musique.flux = await salonVocal.channel.join();
				} catch (_) {
					return msg.reply( `Je n'ai pas la permissions de rejoindre ce salon (si vous pensez que ceci est une erreur contacter @BotTeam )`)
				}
			}
			if(args[0].match(/^http(s?):\/\/www\.youtube\.com\/watch\?v/)) {
				args = args[0];
			} else {
				args = args.join` `;
				let resultat = await musique_find( args );
				if(resultat != null) {
					args = resultat;
				} else {
					return msg.reply( 'Erreur lors de la recherche sur youtube (youtube est down ? :thinking: )');
				}
			}
			if( bot.musique.list.length == 0 ) {
				bot.musique.list = [null, {'link':args,'info':null}];
				musique_next( bot , msg , args );
			} else {
				bot.musique.list.push( {'link':args,'info':null} );
			}
			msg.react('🎵');
		} else {
			return msg.reply( 'Vous devez être présent dans un salon vocal du serveur ! ');
		}
	} catch(e) {
		console.error("Erreur dans le fichier musique.js dans la fonction musique_play");
		console.error(e);
	}
}

module.exports = musique_play;