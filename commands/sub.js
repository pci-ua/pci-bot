exports.run = (bot, message, args) => {
    message.reply(bot.club.manage( args , message ));
}

// Définition des aliase
exports.config = {
    aliases: ["club"],
    guildOnly: true
};

// Génération automatique de la commande help
exports.help = {
    name:"SUB",
    description:"Vous ajoute au role",
    usage:"sub [roleName] "
}