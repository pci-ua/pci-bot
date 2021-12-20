//Éxécution
exports.run = (bot, message, args) => {
	message.reply(bot.club.manage( args , message ));
}

//alias & config
exports.config = {
	aliases: ["club"],
	guildOnly: true
};

//Aide
exports.help = {
    name:"SUB",
    description:"Vous ajoute au role",
    usage:"sub [roleName]"
}
