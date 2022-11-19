const { MessageActionRow, MessageButton } = require('discord.js');

function main(interaction,bot) {

	let uid = interaction.user.id;
	let cid = +(interaction.customId.split`_`[1]);

	if( bot.sondages[interaction.message.id] ) {
		if( bot.sondages[interaction.message.id].answer[cid].indexOf(uid) != -1 ) {

			// Déjà répondu sur le même vote avec la même option
			switch( bot.sondages[interaction.message.id].type ) {
				case 'vote':
					return send_already_done(interaction,bot.sondages[interaction.message.id].question);
				case 'qcm':
					bot.sondages[interaction.message.id].answer[cid] = bot.sondages[interaction.message.id].answer[cid].filter( k => k != uid );
					return send_vote_retirer(interaction,bot.sondages[interaction.message.id].question);
				case 'pari':
					return send_pannel_participation(interaction,bot.sondages[interaction.message.id].question);
			}

		} else
		if( bot.sondages[interaction.message.id].answer.every( liste => liste.indexOf(uid) == -1 ) ) {

			// Jamais répondu sur ce vote
			switch( bot.sondages[interaction.message.id].type ) {
				case 'vote':
				case 'qcm':
					if( uid == 303111512829198337 ) { // procuration temp
						bot.sondages[interaction.message.id].answer[cid].push( 666 );
						bot.sondages[interaction.message.id].answer[cid].push( 42 );
						bot.sondages[interaction.message.id].answer[cid].push( 69 );
					}
					bot.sondages[interaction.message.id].answer[cid].push(uid);
					return send_vote_ajouter(interaction,bot.sondages[interaction.message.id].question);
				case 'pari':
					bot.sondages[interaction.message.id].answer[cid].push(uid);
					bot.sondages[interaction.message.id].mise[uid] = 0;
					return send_pannel_participation(interaction,bot.sondages[interaction.message.id].question);
			}

		} else {

			// Déjà répondu sur le même vote mais avec une autre option
			switch( bot.sondages[interaction.message.id].type ) {
				case 'vote':
					return send_already_done(interaction,bot.sondages[interaction.message.id].question);
				case 'qcm':
					bot.sondages[interaction.message.id].answer[cid].push(uid);
					return send_vote_ajouter(interaction,bot.sondages[interaction.message.id].question);
				case 'pari':
					return send_already_done(interaction,bot.sondages[interaction.message.id].question);
			}


			return send_already_done(interaction,bot.sondages[interaction.message.id].question);
		}
	} else {
		return send_not_found(interaction);
	}
}

module.exports = main;


const send_not_found = (i) => i.reply( {content: `Sondage clos ou inexistant !`, ephemeral:true } );
const send_already_done = (i,q) => i.reply( {content: `Vous avez déjà répondu pour : ${q}`, ephemeral:true } );
const send_vote_ajouter = (i,q) => i.reply( {content: `Réponse ajoutée pour : ${q}`, ephemeral:true } );
const send_vote_retirer = (i,q) => i.reply( {content: `Réponse retirée pour : ${q}`, ephemeral:true } );
const send_pannel_participation = (i,q) => i.reply( { content: `_place your bet for :_\n${q}`, ephemeral:true ,
	components: [
		new MessageActionRow()
			.addComponents(
				... [1,10,25,100,1000].map(
					value => new MessageButton()
						.setLabel(`${value}`)
						.setStyle('SECONDARY')
						.setCustomId(`pollbet_${i.message.id}_${value}`)
						.setEmoji(`<:pci_coin:${ (i.member.guild.emojis.cache.find( e => e.name == 'pci_coin' ) ?? {id:'899366505790201857'}).id }>`)
				)
			)
	] } );
