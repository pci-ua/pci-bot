let exec = null;

//Éxécution
exports.run = async (bot, message, args) => {
	let liste = (await message.guild.members.fetch(message.author.id))._roles;
	let test = false;
	for(let e of liste) {
		if(e=="772967477092155403"||e=="672030950112100372"){
			test = true;
		}
	}
	if(!test) {
		return message.reply("moderator only");
	} else {
		if( exec == null ) {
			let now = new Date();
			let event = new Date('12/25/2020');
			let delta = event - now;
			exec = setTimeout( (salon) => salon.send(":gift:   :christmas_tree:  Joyeux noël tous le monde!  :christmas_tree: :gift: @everyone") , delta , message.channel);
		} else {
			message.reply('Personne ne répond');//il doit être déjà parti
		}
	}
        //message.channel.send(":gift:   :christmas_tree:  Joyeux noël tous le monde!  :christmas_tree: :gift: @everyone");
};

//alias
exports.config = {
    aliases: ["noël"]
};

//Aide
exports.help = {
        name:"DICE",
        description:"Réservé au modérateur pour noël",
        usage:"noël"
};



exports.test = (msg) => {
	console.log( msg.channel.send(' :gift:   :christmas_tree:  **Joyeux noël tous le monde! ** :christmas_tree: :gift: @everyone') );
}
