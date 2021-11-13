async function main(interaction,bot) {

	let uid = interaction.user.id;
	let cid = +(interaction.customId.split`_`[1]);

	if( bot.sondages[interaction.message.id] ) {
		if( bot.sondages[interaction.message.id].answer.every( liste => liste.indexOf(uid) == -1 ) ) {
			bot.sondages[interaction.message.id].answer[cid].push(uid);

			await interaction.reply( {content: `Votre réponse pour : ${interaction.message.content} a été validé !`,ephemeral:true} );
		} else {
			await interaction.reply( {content: `Vous avez déjà répondu pour : ${interaction.message.content}`,ephemeral:true} );
		}
	} else {
		await interaction.reply( {content: `Sondage clos ou inexistant !`} );
	}
}

module.exports = main;
