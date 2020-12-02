//Éxécution
exports.run = (bot, message, args) => {
	message.reply( bot.message.invitation );
}

//alias
exports.config = {
	aliases: ["inv"]
};

//Aide
exports.help = {
    name:"INVITATION",
    description:"Vous retourne l'invitation pour rejoindre le discord.",
    usage:"invitation"
}
