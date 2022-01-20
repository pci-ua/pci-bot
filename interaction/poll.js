const { MessageActionRow, MessageButton } = require('discord.js');

function main(interaction,bot) {

	let uid = interaction.user.id;
	let cid = +(interaction.customId.split`_`[1]);

	if( bot.sondages[interaction.message.id] ) {
		if( bot.sondages[interaction.message.id].answer[cid].indexOf(uid) != -1 ) {

			// Déjà répondu sur le même vote avec la même option
			switch( bot.sondages[interaction.message.id].type ) {
				case 'vote':
					return send_already_done(interaction);
				case 'qcm':
					bot.sondages[interaction.message.id].answer[cid] = bot.sondages[interaction.message.id].answer[cid].filter( k => k != uid );
					return send_vote_retirer(interaction);
				case 'pari':
					return send_pannel_participation(interaction);
			}

		} else
		if( bot.sondages[interaction.message.id].answer.every( liste => liste.indexOf(uid) == -1 ) ) {

			// Jamais répondu sur ce vote
			switch( bot.sondages[interaction.message.id].type ) {
				case 'vote':
				case 'qcm':
					bot.sondages[interaction.message.id].answer[cid].push(uid);
					return send_vote_ajouter(interaction);
				case 'pari':
					bot.sondages[interaction.message.id].answer[cid].push(uid);
					bot.sondages[interaction.message.id].mise[uid] = 0;
					return send_pannel_participation(interaction);
			}

		} else {

			// Déjà répondu sur le même vote mais avec une autre option
			switch( bot.sondages[interaction.message.id].type ) {
				case 'vote':
					return send_already_done(interaction);
				case 'qcm':
					bot.sondages[interaction.message.id].answer[cid].push(uid);
					return send_vote_ajouter(interaction);
				case 'pari':
					return send_already_done(interaction);
			}


			return send_already_done(interaction);
		}
	} else {
		return send_not_found(interaction);
	}
}

module.exports = main;


const send_not_found = (i) => i.reply( {content: `Sondage clos ou inexistant !`, ephemeral:true } );
const send_already_done = (i) => i.reply( {content: `Vous avez déjà répondu pour : ${i.message.content}`, ephemeral:true } );
const send_vote_ajouter = (i) => i.reply( {content: `Réponse ajouter pour : ${i.message.content}`, ephemeral:true } );
const send_vote_retirer = (i) => i.reply( {content: `Réponse retirer pour : ${i.message.content}`, ephemeral:true } );
const send_pannel_participation = (i) => i.reply( { content: `_place your bet for :_\n${i.message.content}`, ephemeral:true ,
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
