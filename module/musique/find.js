/*
	Fait une recherche sur youtube, à partir d'un texte donnée, et retourne le lien du premier résultat (vidéo youtube)
*/

const fetch = require('node-fetch');	// Pour aller faire la recherche car node.js n'implémente pas par défaut fetch

async function musique_find( texte ) {
	const html = await fetch(`https://www.youtube.com/results?search_query=${texte}`).then( reponse => reponse.text() );
	const re = html.match(/\"videoId\":\"([^\"]*)\"/);
	if(re && re[1])
		return `https://www.youtube.com/watch?v=${re[1]}`;
	else
		return null;
}

module.exports = musique_find;