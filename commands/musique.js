'use strict';
const Discord = require("discord.js");		// Message embed, et gestion de la connexion vocal
const ytdl = require('ytdl-core');			// Téléchargement des musiques
const opus = require('@discordjs/opus');	//	Nécéssaire pour le bon fonctionnement de ytdl
const fetch = require('node-fetch');		// Pour allez faire des recherches de musique en ligne

const Message = require('../tools/message.js');	// Pour générer des messages discord plus rapidement
const musique_msg = sujet => Message.embed( 'Musique' , sujet);

let bot_link; // pour récupérer le bot dans certaine situation

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
		console.error("Erreur dans le fichier musique.js dans la fonction musique_help");
		console.error(e);
	}
}

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
		console.error("Erreur dans le fichier musique.js dans la fonction musique_list");
		console.error(e);
	}
}

async function musique_find( texte ) {
	let html = await fetch(`https://www.youtube.com/results?search_query=${texte}`).then( reponse => reponse.text() );
	let re = html.match(/\"videoId\":\"([^\"]*)\"/);
	if(re && re[1])
		return `https://www.youtube.com/watch?v=${re[1]}`;
	else
		return null;
}

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

function musique_next( bot , msg , _ ) {
	try {
		if( bot.musique.playing ) {
			bot.musique.list.shift();
			if( bot.musique.list.length > 0 ) {
				console.log(bot.musique.list[0]);
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

exports.init = (bot) => {
	bot.musique = {
		'playing': false,
		'list': [],
		'flux': null,
		'channelID': null
	};
	bot_link = bot;
};

exports.run = (bot, message, args) => {
	switch( args[0] ) {
		case '-stop':
			musique_stop( bot , message , args);
			break;

		case '-skip':
		case '-next':
			musique_next( bot , message , args);
			break;

		case '-list':
			musique_list( bot , message , args);
			break;

		case '-help':
		case '-aide':
			musique_help( bot , message , args);
			break;

		case '-volume':
		case '-vol':
			break;

		default:
			musique_play( bot , message , args );
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
