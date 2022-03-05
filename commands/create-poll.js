const { info } = require('console');
const { MessageActionRow, MessageButton } = require('discord.js');
const { isMemberBotAdmin } = require('../middleware/user.js');

async function main(interaction,bot) {

	if( ! isMemberBotAdmin(interaction.member) ) {
		return interaction.reply({ content: 'Access denied', ephemeral: true});
	}

	let poll = {
		question: interaction.options.getString('question'),
		reponses: [... new Array(5)].map( (_,i) => interaction.options.getString(`reponse${i+1}`) ).filter( k => k != null ),
		type: interaction.options.getString('type')
	};

	if( poll.reponses.some( R => R.length > 80 ) {
		return interaction.reply( { content: 'Les réponses doivent faires moins de 80 caractères de long', ephemeral: true} );
	}

	const row = new MessageActionRow()
		.addComponents(
			... poll.reponses.map(
				(reponses,id) => new MessageButton()
					.setCustomId(`poll_${id}`)
					.setLabel(reponses)
					.setStyle('PRIMARY')
			)
		)
	;

	if( poll.type == 'pari' ) {
		poll.mise = {};
	}

	let infoMSG;
	switch( poll.type ) {
		case 'vote': infoMSG='Choix unique, sans changement, sans mise.'; break;
		case 'qcm': infoMSG='Choix multiple, avec changement, sans mise.'; break;
		case 'pari': infoMSG='Choix unique, sans changement, avec mise, mise non reductible, mise augmentable.'; break;
	}

	interaction.reply(
		{ content: `_${infoMSG}_\n**${poll.question}**`, components: [row] }
	);

	let sondage = await interaction.fetchReply();

	poll.answer = [... new Array(poll.reponses.length)].map( () => [] );
	bot.sondages[ sondage.id ] = poll;


}

module.exports = main;
