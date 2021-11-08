let symbol = null;

async function main(interaction,bot) {
	let target = await interaction.options.getMember('who') || interaction.member;

	let amount = await new Promise(function(resolve, reject) {
		process.db.get(`SELECT * FROM pcicoin WHERE discord_id = ${target.id}`, function (err,row) {
			if( err ) reject(err);
			else {
				if( row != undefined ) resolve( row.amount );
				else {
					process.db.run(`INSERT INTO pcicoin VALUES ('${target.id}',0)`);
					resolve( 0 );
				}
			}
		});
	});

	if(typeof symbol !== 'string')
		symbol = `<:pci_coin:${ (interaction.member.guild.emojis.cache.find( e => e.name == 'pci_coin' ) ?? {id:'899366505790201857'}).id }>`;

	if( target ) {
		let name = target.nickname || target.user.username;
		await interaction.reply(` ${name} à actuellement ${amount}${symbol} en sa possession. `);
	} else {
		await interaction.reply(` Vous avez actuellement ${amount}${symbol} en votre possession. `);
	}
}

module.exports = main;
