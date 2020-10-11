/********************
* PC[bot]
* Author : Matthew (aka apolloLemon), Mathieu T. (aka StrategeFirst)
* Authors contact : unknown, mathieu.toulon@free.fr
* Release date : Not yet
* Version : 0.0.1
********************/

//Libraire
const Discord 		= require('discord.js');

//Contenu séparé
const Token 		= require('safety.js');
const Dice 			= require('dice.js');
const SuperLoger 	= require('superLog.js');
const Message		= require('preMadeMessage.js');
const Club			= require('clubManager.js');

//Constante
const prefix  = '?';
const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};
const ID_message_d_inscription = 763699097978273812; // <<< c'est ici qu'il faut inséré l'identifiant du message d'inscription

//Variable global
let connected = false;
let lastCrash = 0;
//Initialisation du bot
const bot = new Discord.Client();

// Basic events handler
bot.on('ready', ready => {
	connected = true;
	SuperLoger.log('Démarrer');
	bot.user.setActivity('vos demandes: ' + prefix + 'aide' , {'type': 'LISTENING'});
});
bot.on('disconnect', (errorMessage, code) => {
	SuperLoger.log('Crash',errorMessage,code);
	connected = false;
	
	let now = new Date();
	if(now - lastCrash > 600000 /* Dernier crash il y a plus de 10 minutes en ms */) {
		setTimeout(LogOn, 2500);
	}
});




//
bot.on('message', message => {
	// Sortie préventive
	if( message.author.bot ) return;
	if( ! message.content.startsWith( prefix ) ) return;
	
	// Récupération des données
	let buffer = message.content
		.replace(/ +/g,' ') //Supression des doubles espaces entre paramètre
		.slice( prefix.length ) //Supression du prefix
		.split(' '); //Séparation des paramètres
		
	const command = {
		'name': buffer.shift().toLowerCase(),
		'args': buffer,
	};
	
	// Traitement
	switch( command.name ) {
		case 'hey':
		case 'hi':
		case 'hello':
		case 'bonjour':
		case 'bonsoir':
			let liste = ['bonjour','bonsoir','salut','hello','hi','howdy'];
			message.reply( liste[Math.floor(Math.random()*liste.length)] );
			break;
		case 'inv':
		case 'invitation':
			message.reply( Message.invitation );
			break;
		case 'code':
		case 'git':
		case 'github':
			message.reply(Message.code);
			break;
		case 'help':
		case 'aide':
			if(message.guild !== null)
				message.reply(Message.aideCourte);
			message.author.send(Message.aideLongue);
			break;
		case 'dice':
		case 'roll':
			let reponse = Dice.roll( command.args );
			if( reponse.length > 255 && messageSurServeur(message)) {
				//message trop long et on est sur un serveur
				message.reply(Message.antiSPAM);
				message.author.send(reponse);
			} else
				message.reply(reponse);
			break;
		case 'sub':
		case 'club':
			if(message.guild === null)
				message.reply(Message.serveurSeulement);
			else
				message.reply(Club.manage( command.args , message ));
			break;
		default:
			message.reply(Message.commandeInconnu);
	}
});


bot.on('raw', async packet => {
    //packet.t = type de packet
    //packet.d = data du packet ( donnée )
    if( events[ packet.t ] ) { //si on à définie l'évenement dans ceux à écouté
        bot.emit( events[ packet.t ], packet.d );
    }
});
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< à finirs
async function retirerRoleUtilisateur( user, roleID ) {  }
bot.on('messageReactionRemove', async data =>{
	console.log( data);
        if(parseInt(data.message_id) == ID_message_d_inscription) {
            let who = bot.users.fetch( data.user_id );
            switch( data.emoji.id ) {
                case "L'identifiant de la mention": retirerRoleUtilisateur( who , "le nom du rôle correspondant à l'id du truc" ); break;                
            }
        }
    }
); 

function ajouterRoleUtilisateur( user, nomRole) {}
bot.on('messageReactionAdd', async data =>{
        if(parseInt(data.message_id) == ID_message_d_inscription) {
            let who = bot.users.fetch( data.user_id );
            switch( data.emoji.id ) {
                case "L'identifiant de la mention": retirerRoleUtilisateur( who , "le nom du rôle correspondant à l'id du truc" ); break;                
            }
        }
    }
);
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


function LogOn() {
	bot.login(Token.get());
}

if( ! connected ) {
	LogOn();
}

function messageSurServeur( message ) { return message.guild !== null; }
