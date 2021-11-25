'use strict';
const DATA = require('./data.json');

const Message = require('../tools/message.js');
const fetch = require('node-fetch');

exports.run = async ( interaction ) => {

	await interaction.reply({content : DATA.reponse.chargement });
    const regexTitre = /<h1 class="blog-post-title single-blog-post-title">(.*?)<\/h1>/;
    const regexGif = /https:\/\/lesjoiesducode\.fr\/content\/([^\/]+)\/([^\.]+)\.gif/

	try {
		const page = await fetch(DATA.url).then( response => response.text() );
	} catch ( err ) {
		return await interaction.editReply({content : DATA.reponse.inaccessible});
	}

	const memeGifURL = page.match( regexGif )[0];
	const memeTitle = page.match( regexTitre )[1];

	const embed = Message.embed( memeTitle , DATA.reponse.srcText )
		.attachFiles([ memeGifURL ])

	await interaction.editReply({content : DATA.reponse.resultat, embeds:[embed]});
	
}
