'use strict';

const fetch = require('node-fetch');

async function responseTime( WebSite ) {
	const a = new Date();
	const response = await fetch( WebSite.URL );
	const b = new Date();
	return { URL : WebSite.URL , nom : WebSite.nom , delay : (response.timeout) ? null : (b - a) };
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
	let reponse = new bot.discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Statut des serveurs de l'université")
                .setThumbnail('https://cdn.discordapp.com/icons/672022288476143636/2fb81e0fcd9a3fb98932ff307b2dcf6d.png')
                .setDescription(`Voici l'état des serveurs de l'UA`)
                .setTimestamp()
                .setFooter(
			'Si vous avez un problème n\'hesitez pas à contacter le staff de PCi',
			'https://images-ext-2.discordapp.net/external/KY7Qkke32p9KvAzQLROmNQnbzZC0slzZWtdrvkm9frQ/https/cdn.discordapp.com/icons/672022288476143636/2fb81e0fcd9a3fb98932ff307b2dcf6d.png?width=80&height=80'
		);
	message.reply('Récupération des informations...');
	(await Promise.all(WebSiteList.map(responseTime))).map( etat => ({
		name: `${etat.nom} [ ${etat.URL} ]`,
		value: (etat.delay) ? (
			(etat.delay < 200) ? `:green_circle: ${ etat.delay }ms` : (
			(etat.delay < 500) ? `:yellow_circle: ${ etat.delay }ms` : (
			(etat.delay < 1000)? `:orange_circle: ${ etat.delay }ms` : (
			`:red_circle:  ${ etat.delay }ms`
			) ) )
		) :':black_circle: Timeout !'
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

