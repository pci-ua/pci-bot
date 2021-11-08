const { MessageActionRow, MessageButton } = require('discord.js');
const { isMemberBotAdmin } = require('../middleware/user.js');

async function main(interaction,bot) {

	if( ! isMemberBotAdmin(interaction.member) ) {
		return interaction.reply({ content: 'Access denied', ephemeral: true});
	}

	let poll = {
		question: interaction.options.getString('question'),
		reponses: [... new Array(5)].map( (_,i) => interaction.options.getString(`reponse${i+1}`) ).filter( k => k != null ),
		officiel: interaction.options.getBoolean('officiel') || false,
		masquer: interaction.options.getBoolean('masquer') || false
	};

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

	interaction.reply(
		{ content: `**${poll.question}**`, components: [row] }
	);

	let sondage = await interaction.fetchReply();

	poll.answer = [... new Array(poll.reponses.length)].map( () => [] );
	bot.sondages[ sondage.id ] = poll;


}

module.exports = main;
