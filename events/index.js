module.exports = function(bot) {

// Quand le bot est correctement connecté
bot.on('ready', () => {
	console.log('bot ready');
	bot.user.setActivity('vos demandes: ' + bot.config.prefix + 'aide' , {'type': 'LISTENING'});
	// Mise à jour des SlashCommands
	require('../commands/update');
});

// Si bot ce fait déconnecté
bot.on('disconnect', (errorMessage, code) => {
	console.error('bot disconnected :',errorMessage,code);
	process.exit(1);
});

// Attrape tous les événements et transmet sous conditions
bot.on('raw', packet => require('./raw/')(packet) );

// SlashCommands, ButtonInteraction, ...
bot.on('interactionCreate', interaction => {
	switch (interaction.type) {
		case 'APPLICATION_COMMAND': require('../commands/')( interaction );

			break;
		case 'MESSAGE_COMPONENT': require('../components/')( interaction );

			break;
		default:
			console.warn( `unknown interaction type : ${interaction.type}! ` );
	}
} );

}