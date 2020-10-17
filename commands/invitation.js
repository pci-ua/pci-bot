exports.run = (bot, message, args) => {
    message.reply( bot.message.invitation );
}

// Définition des aliase
exports.config = {
    aliases: ["inv"]
};

// Génération automatique de la commande help
exports.help = {
    name:"INVITATION",
    description:"Vous retourne l'invitation pour rejoindre le discord",
    usage:"invitation"
}
