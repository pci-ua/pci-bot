const { DiscordAPIError } = require("discord.js");

exports.run = (bot, message, args) => {
    // Si on est dans une guilde, on renvoie l'utilisateur dans des DM
    if(message.guild !== null)
        message.reply(bot.message.aideCourte);

    var embed = new bot.discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Commande pour le PC[Bot]')
        .setThumbnail('https://cdn.discordapp.com/icons/672022288476143636/2fb81e0fcd9a3fb98932ff307b2dcf6d.png')
        .setDescription('Voici toutes les commandes qui sont disponibles')
        .setTimestamp()
        .setFooter('Si vous avez un problème n\'hesitez pas à contacter le staff de PCi', 'https://cdn.discordapp.com/icons/672022288476143636/2fb81e0fcd9a3fb98932ff307b2dcf6d.png');

    bot.commands.each( command => {
        if(command.help)
        {
            description = "";

            if(command.help.description)
                description += `__Description__ : ${command.help.description}\n`;
            
            if(command.help.usage)
                description +=  `__Usage__ : ${bot.prefix + command.help.usage}\n`;
            
            if(command.config.aliases)
                description += '__Alias__ : ' + command.config.aliases.join(', ');

            // On met inline un field sur deux
            console.log(embed.fields.length % 2 != 0),
            embed.addField(`${command.help.name}`, description, embed.fields.length % 2 != 0);
        }
    });

    message.author.send(embed);
}

// Définition des aliase
exports.config = {
    aliases: ["aide"]
};
