const Message = require('../tools/message.js');

var http = require('follow-redirects').http;
var he = require('he');

exports.run = (bot, message, args) => {

	const regexTitre = /<h1 class="blog-post-title single-blog-post-title">(.*?)<\/h1>/gm;
	const regexImg = /data[-src]*=(.*?) /gm;

	// On va chercher un meme random
	let request_call = new Promise((resolve, reject) => {
		
		let chunks_of_data = [];
		
		http.get('http://lesjoiesducode.fr/random', response => {

		response.on('data', chunk => {
			chunks_of_data.push(chunk);
		});

		response.on('end', () => {
			let response_body = Buffer.concat(chunks_of_data);
			
			// promise resolved on success
			resolve(response_body.toString());
		});
	
		}).on('error', err => {
			reject(err);
		});
	});

	request_call.then((response) => {
		// On extrait le titre et le contenu
	   let titre = regexTitre.exec(response)[1];
	   const path = regexImg.exec(response)[1];

	   // On met la première lettre en majuscule puis on decode les html entities
	   titre = titre.charAt(0).toUpperCase() + titre.slice(1);
	   titre = he.decode(titre);

	   // Création de l'embed
	   var embed = Message.embed( titre , 'Source : [Les joies du code](https://lesjoiesducode.fr/)')
		.setImage(path);

		message.reply(embed);
	}).catch((error) => {
		console.log(error);
		message.reply("Erreur de communication avec le serveur de memes");
	});
}

// Définition des aliase
exports.config = {
	aliases: []
};

// Génération automatique de la commande help
exports.help = {
	name:"MEME",
	description:"Renvoie un meme random basée sur le site [Les joies du code](https://lesjoiesducode.fr/)",
	usage:"meme"
}
