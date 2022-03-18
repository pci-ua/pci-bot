const { isMemberBotAdmin } = require('../../middleware/user.js');
const { emoji } = require('../../middleware/coin.js');
async function main(interaction,bot) {

	if( ! isMemberBotAdmin(interaction.member) ) {
		interaction.reply({ content: 'Access denied', ephemeral: true});
	}

	let sondageID = interaction.options.getString('idsondage');
	if( bot.sondages[ sondageID] ) {
		const poll = bot.sondages[ sondageID ];
		await interaction.reply( {content:
`
Question : ${ poll.question }
Réponses :
${ poll.reponses.map( k => `\t${k}` ).join`\n`}
Type : ${ poll.type }

Participant unique : ${ [... new Set(poll.answer.flat())].length }
${ (poll.type == 'pari') ? `Total de ${emoji(interaction.member.guild)} investi : ${Object.values(poll.mise).reduce( (acc,now) => acc+now )}` : '' }

`, ephemeral: true}
		);
	} else {
		interaction.reply({ content: 'Sondage déjà clos ou inexistant ! ', ephemeral: true});
	}
}
module.exports = main;
