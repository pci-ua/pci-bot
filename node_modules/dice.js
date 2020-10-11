/**************************
* PC[bot] > Lanceur de dé *
**************************/

// Constante
const maxDice = 50;

// Fonction annexe seulement accessible par dice.js
const déToString = ( liste ) => liste.join`, `;
const lancerDesDé = ( value , count = 1 ) => Array.from(new Array(count),k=>lancer(value));
const lancer = ( nbFace ) => Math.ceil( Math.random() * nbFace );

// Main code
exports.roll = ( args ) => {
	// La fonction doit recevoir au moins un argument
	if(args.length == 0) return " Erreur, la fonction attend des arguments, pour connaitre son fonctionnement check l'aide ! ";

	let result = [];
	for(let arg of args) {
		//1 ; 45 ; 456 ; 94 ; 2 ; 8
		if( arg.match( /^[0-9]+$/ ) ) {
			result.push( arg + ' : ' + déToString(lancerDesDé(parseInt(arg))) );
		} else

		//4d9 ; 3d7 ; 9d8 ; 11d4
		if( arg.match( /^[0-9]+d[0-9]+$/ ) ) {
			const v = parseInt(arg.split('d')[1]);
			const c = parseInt(arg.split('d')[0]);
			result.push( arg + ' : ' + déToString(lancerDesDé(v,c)) );
			if(c>maxDice) return ` Erreur, trop de tirage demander, vous avez demander ${c}, le maximum est de ${maxDice}`;
		} else

		//5d6+8 ; 3d7+2 ; 9d14+64
		if( arg.match( /^[0-9]+d[0-9]+\+[0-9]+$/ )) {
			const d = parseInt(arg.split('d')[1].split('+')[1]);
			const v = parseInt(arg.split('d')[1].split('+')[0]);
			const c = parseInt(arg.split('d')[0]);
			if(c>maxDice) return ` Erreur, trop de tirage demander, vous avez demander ${c}, le maximum est de ${maxDice}`;
			result.push( arg + ' : ' + déToString(lancerDesDé(v,c).map( k => k+d)) );
		} else

		//5d6-8 ; 3d7-2 ; 9d14-64
		if( arg.match( /^[0-9]+d[0-9]+\-[0-9]+$/ )) {
			const d = parseInt(arg.split('d')[1].split('-')[1]);
			const v = parseInt(arg.split('d')[1].split('-')[0]);
			const c = parseInt(arg.split('d')[0]);
			if(c>maxDice) return ` Erreur, trop de tirage demander, vous avez demander ${c}, le maximum est de ${maxDice}`;
			result.push( arg + ' : ' + déToString(lancerDesDé(v,c).map( k => k-d)) );
		}

		//aucun pattern précédent
		else {
			return " L'argument : " + arg.toString() + " ne correspond à aucun pattern fourni par dice, pour connaitre son fonctionnement check l'aide ! ";
		}
	}
	result.unshift( " Et voici les résultats : " );
	return result.join( "\n" );
};

