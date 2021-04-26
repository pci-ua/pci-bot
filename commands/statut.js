'use strict';

const fetch = require('node-fetch');
const Message = require('../tools/message.js');

let timer = 0;
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

let WebSiteList = [
 { 'URL' : "https://ent.univ-angers.fr/", 'nom' : "ENT" },
 { 'URL' : 'https://moodle.univ-angers.fr/', 'nom' : 'Moodle' },
 { 'URL' : 'https://zimbra.univ-angers.fr/', 'nom': 'Zimbra' },
 { 'URL' : 'http://devel.info.univ-angers.fr/', 'nom' : 'Devel' },
 { 'URL' : 'http://forge.info.univ-angers.fr/', 'nom' : 'Forge' },
];

//Éxécution
exports.run = async (bot, message, args) => {
	const now = new Date();
	if( now - timer < 60000 ) return message.reply( Message.embed( "Commande en cooldown veuillez patienter" , `Temps restants : ${(60000 - (now - timer))/1000}s` ) );
	timer = now;
	let reponse = Message.embed( "Statut des serveurs de l'UA" ,`plus de détails au lien suivant http://supervision.univ-angers.fr/`);
	message.reply('Récupération des informations...');
	(await Promise.all(WebSiteList.map(responseTime))).map( etat => ({
		name: `${etat.nom} [ ${etat.URL} ]`,
		value: (etat.error !== undefined )
			?
			( `:octagonal_sign: Timeout : ${etat.error}` )
			:
			(
				(etat.delay) ? (
				(etat.delay < 200) ? `:green_circle: ${ etat.delay }ms` : (
				(etat.delay < 500) ? `:yellow_circle: ${ etat.delay }ms` : (
				(etat.delay < 1000)? `:orange_circle: ${ etat.delay }ms` : (
				`:red_circle:  ${ etat.delay }ms`
				) ) ) ) : ':black_circle: Timeout !'
			)
	})).forEach( serveur => reponse.addField( serveur.name , serveur.value ) );
      	message.reply(reponse);
};

//alias
exports.config = {
    aliases: ["status","server-status"	]
};

//Aide
exports.help = {
        name:"STATUT",
        description:"Retourne le statut des différent serveur de l'UA",
        usage:"statut"
};

