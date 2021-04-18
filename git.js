//Éxécution
exports.run = (bot, message, args) => {
	message.reply(bot.message.code);
}

//alias
exports.config = {
	aliases: ["code","github"]
};

//Aide
exports.help = {
	name:"GIT",
	description:"Vous renvoie l'url du dépot github",
	usage:"git"
}
