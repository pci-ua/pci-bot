const { readdir } = require('fs');

// Mise à jours des SlashCommands
// <1> Récupération contenu dossier
new Promise( (resolve, reject) => {
	readdir( ('./custom') , {} , (err,liste) => {
		if( err ) {
			reject( err );
		} else {
			resolve( liste );
		}
	} );
} )
// <2> Filtrage des seul fichier désirés
.then( liste => liste.filter( fichier => fichier.match(/\.js$/) && fichier != 'index.js' ) )
// <3> Appel des fichiers
.then( liste => liste.forEach( fichier => require(`./${fichier}`) ) )
