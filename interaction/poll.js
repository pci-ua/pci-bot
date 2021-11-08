async function main(interaction,bot) {

	let uid = interaction.user.id;
	let cid = +(interaction.customId.split`_`[1]);

	if( bot.sondages[interaction.message.id].answer.every( liste => liste.indexOf(uid) == -1 ) ) {
		bot.sondages[interaction.message.id].answer[cid].push(uid);

		interaction.reply( {content: `Votre réponse pour : ${interaction.message.content} a été validé !`,ephemeral:true} );
	} else {
		interaction.reply( {content: `Vous avez déjà répondu pour : ${interaction.message.content}`,ephemeral:true} );
	}
}

module.exports = main;
