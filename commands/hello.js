//Éxécution
exports.run = (bot, message, args) => {
	let liste = ['bonjour','bonsoir','salut','hello','hi','howdy'];
	message.reply( liste[Math.floor(Math.random()*liste.length)] );
}

//alias
exports.config = {
	aliases: ["hi","hey","bonjour","bonsoir"]
};

//Aide
exports.help = {
	name:"HELLO",
	description:"Vous salue.",
	usage:"hello"
}
