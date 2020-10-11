/*************************
* PC[bot] > Super logger *
*************************/

//Librairie
const fs = require('fs');

//Constante
const logFile = './data.log';							// Fichier d'enregistrement des logs
const onError = (err) => { if(err){console.error(err); throw err;} };		// En cas d'erreur
const writingOptions = {							// Options d'écritures dans le fichier
	'encoding': 'utf-8',							// - encodage utf8
	'flag': 'a',								// - mode 'append' ajout à la fin du fichier (s'il n'existe il est créé)
};

//Coprs
exports.log = ( ...param ) => {
	// Préparation de l'entête pour les lignes du fichier
	let date = ' [ ' + (new Date()).toLocaleString() + ' ] ';

	// Fusionne le tout en une chaine de caractère
	const texte = date + param
		.map( element => element.toString() )
		.join( '\t\n' ) + '\r\n';

	// Ecrit dans le fichier
	fs.writeFile(
		logFile,
		texte,
		writingOptions,
		onError);
};
