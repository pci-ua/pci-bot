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
	info.name = `${reponse.nom} [ ${reponse.URL} ]`;
	if( reponse.error ) {
		info.value = `:octagonal_sign: Timeout | Erreur : ${reponse.error}`
	} else {
		switch (true) {
			case (etat.delay < 200) :
				info.value = `:green_circle: ${ etat.delay }ms`;
				break;
			case (etat.delay < 500) :
				info.value = `:yellow_circle: ${ etat.delay }ms`;
				break;
			case (etat.delay < 1000) :
				info.value = `:orange_circle: ${ etat.delay }ms`;
				break;
			case (etat.delay >= 1000) :
				info.value = `:red_circle: ${ etat.delay }ms`;
				break;
			default:
				info.value = ':black_circle: Timeout !';
		}
	}
}

//Éxécution
module.exports = async ( interaction ) => {
	// Message temporaire le temps de rechercher les informations
	await interaction.reply( {content: DATA.reponse.chargement} );

	// Méthode anti DDOS via cooldown
	const now = new Date();
	if( now - cooldown_timer < DATA.cooldown_ms ) {
		const remainingSeconds = (DATA.cooldown_ms - (now - cooldown_timer))/1000;
		await interaction.editReply( {content:`${DATA.reponse.cooldown} ${remainingSeconds}s`} );
	} else {
		// éxécution donc mise à jour du cooldown
		timer = now;

		let reponse = Message.embed( "Statut des serveurs de l'UA" ,`Page statut UA http://supervision.univ-angers.fr/ (pas très très précises)`);

		// Récupération des données (envoie requête)
		(await Promise.all(DATA.listeServeurUA.map(responseTime)))
		// Prépartion des données (Prépartion du texte etc)
		.map(traitementData)
		// Incorporation des données (Ajout au message)
		.forEach( ( info ) => reponse.addField( info.name , info.value ) );

		// Envoie de la réponse généré
		await interaction.editReply( {content:DATA.reponse.resultat,embeds:[reponse]} );
	}
};
