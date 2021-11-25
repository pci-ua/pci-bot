'use strict';
const DATA = require('./data.json');

module.exports = async ( interaction ) => {
	const nb_face = interaction.options.getInteger('nb_face') || 6 ;
	const nb_tirage = interaction.options.getInteger('nb_tirage') || 1 ;
	const modifier = interaction.options.getInteger('modifier') || 0 ;

	let resultat = [ ... new Array(nb_tirage) ].map( () => Math.ceil(Math.random() * nb_face) + modifier );

	const somme = resultat.reduce( (acc,current) => acc + current , 0 );

	const JDRstring = `${nb_tirage}d${nb_face}${(modifier==0)?'':((modifier>0):(`+${modifier}`)?modifier)}`;

	await interaction.reply( { content : `Résultat de _${JDRstring}_ : [${resultat.join`, `}] , soit ${somme}.` } );
}
