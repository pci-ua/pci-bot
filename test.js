const Discord 		= require('discord.js');
const Token 		= require('safety.js');
const bot = new Discord.Client();
bot.on('ready', ready => {
	console.log('Start!');
});
bot.on('disconnect', (errorMessage, code) => {
	console.error(errorMessage,code);
});
bot.on('raw',async packet => {
	if(packet.t == 'MESSAGE_REACTION_ADD')
		console.log(packet);
});
function LogOn() {
	bot.login(Token.get());
}


	LogOn();

