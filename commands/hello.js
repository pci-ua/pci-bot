exports.run = (bot, message, args) => {
    let liste = ['bonjour','bonsoir','salut','hello','hi','howdy'];
	message.reply( liste[Math.floor(Math.random()*liste.length)] );
}

// Définition des aliase
exports.config = {
    aliases: ["hi","hey","bonjour","bonsoir"]
};

// Génération automatique de la commande help
exports.help = {
    name:"hello",
    description:"Vous salue",
    usage:"hello"
}