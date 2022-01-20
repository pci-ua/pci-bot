
const coin = require('../middleware/coin.js');

function main(interaction,bot) {

	let uid = interaction.user.id;
	let mid = (interaction.customId.split`_`[1]);
	let amount = +(interaction.customId.split`_`[2]);

	if( bot.sondages[mid] ) {
		coin.get( interaction.user )
			.then( available => {
				if( available < amount ) {
					interaction.reply( {content: `Pas assez de ${coin.emoji(interaction.member.guild)} ;(`, ephemeral:true } );
				} else {
					coin.remove( amount, interaction.user )
						.then( newbalance => {
							bot.sondages[mid].mise[uid] += amount;
							interaction.reply( {content: `Contribution de ${amount} ajouter pour un total de ${bot.sondages[mid].mise[uid]}, il vous reste ${newbalance}`, ephemeral:true } );
						} )
						.catch( error => {
							console.error( error );
							interaction.reply( {content: `Oups, something went wrong ! ;(`, ephemeral:true } );
						} )
				}
			} )
			.catch( error => {
				console.error( error );
				interaction.reply( {content: `Oups, something went wrong ! ;(`, ephemeral:true } );
			} )


	} else {
		interaction.reply( {content: `Sondage clos ou inexistant !`, ephemeral:true } );
	}
}

module.exports = main;

