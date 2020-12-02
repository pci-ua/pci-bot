//Librairie
const { DiscordAPIError } = require("discord.js");

//Éxécution
exports.run = (bot, message, args) => {
	// Si on est dans une guilde, on renvoie l'utilisateur dans des DM
	if(message.guild !== null)
        	message.reply(bot.message.aideCourte);

	//Création du message
	let embed = new bot.discord.MessageEmbed()
        	.setColor('#0099ff')
        	.setTitle('Commande pour le PC[Bot]')
        	.setThumbnail('https://cdn.discordapp.com/icons/672022288476143636/2fb81e0fcd9a3fb98932ff307b2dcf6d.png')
        	.setDescription('Voici toutes les commandes qui sont disponibles')
        	.setTimestamp()
        	.setFooter('Si vous avez un problème n\'hesitez pas à contacter le staff de PCi', 'https://cdn.discordapp.com/icons/672022288476143636/2fb81e0fcd9a3fb98932ff307b2dcf6d.png');

	//Ajout du contenu
	bot.commands.each( command => {
		if(command.help) {
			description = "";

			if(command.help.description)
				description += `__Description__ : ${command.help.description}\n`;
			if(command.help.usage)
				description +=  `__Usage__ : ${bot.prefix + command.help.usage}\n`;
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
