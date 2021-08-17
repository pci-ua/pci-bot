/***********************************
* PC[bot] > Gestionnaire des clubs *
***********************************/

// Constante
const prefixOfOptions = '~';
const errorSignature = "Votre commande est mal formé!";
const acceptRole = /^[a-z\u00E0-\u00FC]+$/;
const permitAdd = 'mkTags';

// Fonction local
const getTarget = (aim,data) => data.guild.roles.cache.find( x => (x.name === aim) );

exports.manage = ( args , data ) => {
	// La fonction doit recevoir au moins un argument
	if(args.length == 0) return "Erreur, la fonction attend des arguments, pour connaître son fonctionnement check l'aide !";

	// Traitement de l'option choisi (par défaut ajout)
	let mode;
	if( args[0].startsWith( prefixOfOptions ) ) {
		mode = args.shift().slice( prefixOfOptions.length );
	} else
		mode = 'add';

	// Cas particulier : demande la liste
	if( ['ls','list'].indexOf( mode ) != -1 ) {
		return 'Voici la liste des clubs actuels: \n'+Array.from(data.guild.roles.cache.values()).map( ele => ele.name ).filter( ele => ele.match( acceptRole ) ).join('\n');			
	}
	// Cas particulier : permissions requise pour création
	let buffer;
	if( ['create','new'].indexOf( mode ) != -1 ) {
		if(data.member.roles.cache.has( data.guild.roles.cache.find( x => (x.name == permitAdd) ).id ) ) {
			buffer = Array.from(data.guild.roles.cache.values()).map( ele => ele.name );
		} else
			return "Erreur, vous n'avez pas les permissions requises !";
	}

	// Traitements des paramètres
	let reponse = [];
	let target;
	for(let element of args) {
		if(element.match(acceptRole)) {
			switch( mode ) {
				case 'add':
				case 'join':
					target = getTarget(element,data);
					if( target ) {
						if( data.member.roles.cache.has( target.id ) )
							reponse.push(`Vous avez déjà le rôle ${ element }.`);
						else {
							data.member.roles.add( target );
							reponse.push(`Rôle correctement ajouté: ${ element }`);
						}
					} else
						reponse.push(`Rôle inconnu(${ element }), demander à un modérateur si vous souhaitez l'ajouter!`);
				break;


				case 'rm':
				case 'remove':
				case 'leave':
					target = getTarget(element,data);
					if( target ) {
						if( data.member.roles.cache.has(target.id) ) {
							data.member.roles.remove( target );
							reponse.push(`Rôle correctement retiré: ${ element }`);
						} else
							reponse.push(`Vous n'avez pas le rôle ${ element }, je ne peut donc pas vous le retirer`);
					} else
						reponse.push(`Rôle inconnnu(${ element }), demander à un modérateur si vous souhaitez l'ajouter!`);
				break;


				case 'create':
				case 'new':
					if(buffer.indexOf(element) != -1) {
						reponse.push(`Rôle déjà existant: ${element}`);
					} else {
						data.guild.roles.create(
							{
								data: {
									name: element,
									mentionable: true
								},
								reason: `Créé par : ${ data.author }`,
							}
						);
						reponse.push(`Rôle créé: ${ element }`);
					}
				break;

				default:
					return 'mode inconnu';
			}
		} else {
			reponse.push(`Entrée invalide : ${element}`);
		}
	}
	return reponse.join('\n');
};

