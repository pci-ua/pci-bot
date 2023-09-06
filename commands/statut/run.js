'use strict';
const DATA = require('./data.json');

const fetch = require('node-fetch');
const Message = require('../../tools/message');

// Pour évité que l'on DDOS les serveurs de l'UA ^^
let cooldown_timer = 0;

// à partir d'une URL retourne un délai et/ou une erreur de réponse du serveur
async function responseTime( WebSite ) {
	try {
		const a = new Date();
		const response = await fetch( WebSite.URL );
		const b = new Date();
		return { URL : WebSite.URL , nom : WebSite.nom , delay : (response.timeout) ? null : (b - a) };
	} catch (e) {
		return { URL : WebSite.URL , nom : WebSite.nom , delay : null  , error : e };
	}
}

// à partir d'une réponse serveur avec des données prépares les textes du messages
function traitementData( reponse ) {
	let info = {};
	info.name = reponse.nom;
	info.URL = reponse.URL;
	if( reponse.error ) {
		info.badge = `:octagonal_sign:`;
		info.delay = ` Error !`
		info.details = `${reponse.error}`
	} else {
		switch (true) {
			case (reponse.delay < 200) :
				info.badge = `:green_circle:`
				info.delay =  `${ reponse.delay }ms`;
				break;
			case (reponse.delay < 500) :
				info.badge = `:yellow_circle:`
				info.delay =  `${ reponse.delay }ms`;
				break;
			case (reponse.delay < 1000) :
				info.badge = `:orange_circle:`
				info.delay =  `${ reponse.delay }ms`;
				break;
			case (reponse.delay >= 1000) :
				info.badge = `:red_circle:`
				info.delay =  `${ reponse.delay }ms`;
				break;
			default:
				info.badge = `:black_circle:`;
				info.delay =  ` Timeout !`;
		}
	}
	return info;
}

//Éxécution
module.exports = async ( interaction ) => {
	// Message temporaire le temps de rechercher les informations
	await interaction.reply( {content: DATA.reponse.chargement} );

	// Méthode anti spam via cooldown
	const now = new Date();
	if( now - cooldown_timer < DATA.cooldown_ms ) {
		const remainingSeconds = (DATA.cooldown_ms - (now - cooldown_timer))/1000;
		await interaction.editReply( {content:`${DATA.reponse.cooldown} ${remainingSeconds}s`} );
	} else {
		// éxécution donc mise à jour du cooldown
		cooldown_timer = now;

		let reponse = Message.embed( "Statut des serveurs de l'UA" ,`Page statut UA http://supervision.univ-angers.fr/ (pas très très précises)`);

		// Ping servers
		const info = (await Promise.all(DATA.listeServeurUA.map(responseTime))).map(traitementData)

		reponse.addFields( { name: '\u200B', value: '\u200B' } )
		reponse.addFields(
			{ value:'_ _' , inline: true , name:':vertical_traffic_light: Latence'},
			{ value:'_ _' , inline: true , name:'Service'},
			{ value:'_ _' , inline: true , name:'URL'},
		)
		info.forEach( request => {
			reponse.addFields(
				{ name: '_ _' , inline: true , value: `${request.badge} ${request.delay}` },
				{ name: '_ _' , inline: true , value: `${request.name}` },
				{ name: '_ _' , inline: true , value: `${request.URL}` },
			)
		} )
		reponse.addFields( { name: '\u200B', value: '\u200B' } )

		// Envoie de la réponse généré
		await interaction.editReply( {content:DATA.reponse.resultat,embeds:[reponse]} );
	}
};
