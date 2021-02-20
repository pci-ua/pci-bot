exports.run = async(bot, message) => {
	// On ignore les message des bots et ceux qui ne commencent pas par le prefix
	if (message.author.bot) return;

	if (message.content.startsWith(bot.prefix)) {

		// On met les arguments dans un tableau
		let messageArray = message.content.split(" "),
		cmd = messageArray[0].substring(1),
		args = messageArray.slice(1);

		const command = bot.commands.get(cmd) || bot.aliases.get(cmd);

		// Si une commande correpond à la commande trouver alors
		if(command)
			// On check si on peut executer la commande sur le serveur
			if(command.config.guildOnly && message.guild === null)
				message.reply(bot.message.serveurSeulement);
			else
				command.run(bot,message,args);
		else if(message.content != "?")
			message.reply(bot.message.commandeInconnu);
		else
			;//on ignore juste les messages contenant juste le ?
	}
};
