/*
	Permet d'initialiser les variables utiliser par le bot
*/

module.exports = (bot) => {
	bot.musique = {
		'playing': false,
		'list': [],
		'flux': null,
		'channelID': null
	};
};