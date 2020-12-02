//Éxécution
exports.run = (bot, message, args) => {
	message.channel.send("Pong");
};

//alias
exports.config = {
	aliases: ["pong", "pingpong"]
};

//Aide
exports.help = {
	name:"PING",
	description:"Renvoie pong.",
	usage:"ping"
}
