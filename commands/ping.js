exports.run = (bot, message, args) => {
    message.channel.send("Pong");
};

// Définition des aliase
exports.config = {
    aliases: ["pong", "pingpong"]
};

// Génération automatique de la commande help
exports.help = {
    name:"PING",
    description:"Renvoie pong",
    usage:"ping"
}