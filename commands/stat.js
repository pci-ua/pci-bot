//Éxécution
exports.run = async (bot, message, args) => {
	//Récupère le serveur
	let serveur = message.guild;


	//Créé la template du message
	let msg = new bot.discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Statistique de PC[i]')
		.setThumbnail('https://cdn.discordapp.com/icons/672022288476143636/2fb81e0fcd9a3fb98932ff307b2dcf6d.png')
		.setDescription('Voici quelques statistiques sur le serveur PC[i]')
		.setTimestamp()
		.setFooter('Si vous avez un problème n\'hesitez pas à contacter le staff de PCi', 'https://cdn.discordapp.com/icons/672022288476143636/2fb81e0fcd9a3fb98932ff307b2dcf6d.png');


	// on s'assure que tous les membres sont dans le cache serveur
	try {
		const f=(a)=>a.charCodeAt(0);
		let listeDAttente = [];
		for(let i='A';f(i)<=f('z');i=String.fromCharCode(f(i)+1)) // on lance toutes les demandes
			listeDAttente.push( serveur.members.fetch( {query:i,limit:30} ) );
		await Promise.all(listeDAttente) // on attend toutes les demandes
	} catch(err) {
		console.log('err',err);
	}



	//Préparation
	const msg_membres =
		`Le serveur compte actuellement ${serveur.memberCount} membres, dont\n` +
		['L1','L2','L3','L3 Pro','M1','M2','Doctorant','Enseignant']
			.map( R => ` ► ${serveur.roles.cache.find( e => e.name === R ).members.size} ${R}` )
			.join('\n');
	const msg_bot = `uptime : ${ getDurationString( (new Date()) - bot.beginTimeStamp ) }`;


	//Ajout
	msg.addField('Membres', msg_membres);
	msg.addField('PC[bot]', msg_bot);
	msg.addField('à venir', "d'autres statistiques vont bientôt être disponibles!!!");

	//Envoie
	message.reply(msg);
}

//alias
exports.config = {
	aliases: ["stats"]
};

//Aide
exports.help = {
	name:"STAT",
	description:"Vous renvoie certaines statistiques",
	usage:"stat"
}

//Factorisation
function getDurationString(duration) {
	const ms = duration%1000; duration=Math.floor(duration/1000);
	const s = duration%60; 	duration=Math.floor(duration/60);
	const m = duration%60; 	duration=Math.floor(duration/60);
	const h = duration%24; 	duration=Math.floor(duration/24);
	const j = duration;

	let rep = '';
	if(j >0) rep += j + 'jour(s)'+'.';
	if(h >0) rep += h + 'heure(s)'+' ';
	if(m >0) rep += m + 'minute(s)'+' ';
	if(s >0) rep += s + 'seconde(s)'+' ';
	return rep;
}
