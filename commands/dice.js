const Dice = require('../dice.js');

//Éxécution
exports.run = (bot, message, args) => {
	let reponse = Dice.roll( args );
	if( reponse.length > 255 && message.guild !== null) {
		//message trop long et on est sur un serveur
		message.reply(bot.message.antiSPAM);
	}
	message.author.send(reponse);
};

//alias
exports.config = {
    aliases: ["roll"]
};

//Aide
exports.help = {
	name:"DICE",
	description:"Lance un dé virtuel ( retourne un nombre aléatoire )",
	usage:"dice [nombre | xdy  <où x et y sont des nombres entier> ]"
};
