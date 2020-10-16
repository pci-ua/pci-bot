exports.run = (bot, message, args) => {
	message.reply(bot.message.code);
}

// Définition des aliase
exports.config = {
    aliases: ["code","github"]
};

// Génération automatique de la commande help
exports.help = {
    name:"GIT",
    description:"Vous renvoie l'url du dépot github",
    usage:"git"
}