//Librairie
const { DiscordAPIError } = require("discord.js");
const Message = require('../tools/message.js');

//Éxécution
exports.run = (bot, message, args) => {
	// Si on est dans une guilde, on renvoie l'utilisateur dans des DM
	if(message.guild !== null)
        	message.reply(bot.message.aideCourte);

	//Création du message
	let embed = Message.embed( 'Commande pour le PC[Bot]' , 'Voici toutes les commandes qui sont disponibles' );

	//Ajout du contenu
	bot.commands.each( command => {
		if(command.help) {
			description = "";

			if(command.help.description)
				description += `__Description__ : ${command.help.description}\n`;
			if(command.help.usage)
				description +=  `__Usage__ : ${bot.config.prefix + command.help.usage}\n`;
			if(command.config.aliases)
				description += '__Alias__ : ' + command.config.aliases.join(', ');

			embed.addField(`${command.help.name}`, description);
		}
	});

	//Envoie de la réponse
	message.author.send(embed);
}

//alias
exports.config = {
	aliases: ["aide"]
};
