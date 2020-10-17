const Dice = require('dice.js');

exports.run = (bot, message, args) => {
	let reponse = Dice.roll( args );
    if( reponse.length > 255 && message.guild !== null) {
        //message trop long et on est sur un serveur
        message.reply(bot.message.antiSPAM);
        message.author.send(reponse);
    } else
        message.reply(reponse);
}

// Définition des aliase
exports.config = {
    aliases: ["roll"]
};

// Génération automatique de la commande help
exports.help = {
    name:"DICE",
    description:"J'ai pas compris la commande",
    usage:"dice [nombre ...]"
}
