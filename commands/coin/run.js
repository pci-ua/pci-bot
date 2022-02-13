const coin = require('../middleware/coin.js');

async function main(interaction,bot) {
	let target = await interaction.options.getMember('who') || interaction.member;
	let amount = await coin.get(target);
	let symbol = coin.emoji(interaction.member.guild);

	if( target != interaction.member ) {
		let name = target.nickname || target.user.username;
		await interaction.reply(` ${name} a actuellement ${amount}${symbol} en sa possession. `);
	} else {
		await interaction.reply(` Vous avez actuellement ${amount}${symbol} en votre possession. `);
	}
}

module.exports = main;
