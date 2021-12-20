const { MessageButton, MessageActionRow } = require('discord.js');

module.exports = async function(interaction) {
	const membre = interaction.member;
	const serveur = membre.guild;
	const role =  serveur.roles.cache;

	const ask = interaction.customId.split`_`[2].toLowerCase() ;

	switch( ask ) {
	/* Cases bleu */
		// Rôle simple
		case 'l1': 
		case 'l2':
		case 'l3':
		case 'm1':
			await membre.roles.add( role.find( x => x.name.toLowerCase() === ask ).id );
			return interaction.reply({ content : `Le rôle ${ask} vous a été ajouté.` , ephemeral: true });
		
		// Petit cas particulier
		case 'l3pro':
			await membre.roles.add( role.find( x => x.name.toLowerCase() === 'l3 pro' ).id );
			return interaction.reply({ content : `Le rôle ${ask} vous a été ajouté.` , ephemeral: true });

		// Rôle complexe
		case 'm2id':
			await membre.roles.add( role.find( x => x.name.toLowerCase() === 'm2' ).id );
			await membre.roles.add( role.find( x => x.name.toLowerCase() === 'm2-id' ).id );
			return interaction.reply({ content : `Les rôle M2 et M2 ID vous ont été ajouté.` , ephemeral: true });
		case 'm2acdi':
			await membre.roles.add( role.find( x => x.name.toLowerCase() === 'm2' ).id );
			await membre.roles.add( role.find( x => x.name.toLowerCase() === 'm2-acdi' ).id );
			return interaction.reply({ content : `Les rôle M2 et M2 ACDI vous ont été ajouté.` , ephemeral: true });

	/* Cases grises */
		case 'enseignant':
		case 'doctorant':
		case 'alumni':
		case 'externe':
			await interaction.reply({ content : `La demande que vous avez faite pour le rôle a été transférer, une verification manuel est en cours, merci de patienter et de répondre à la modération.` , ephemeral : true });
			let salon = await process.bot.channels.fetch( process.bot.config.pingRoleChannelId );
			let message = `
Demande de rôle :
${membre}
${ask}
`;
		return await salon.send( {
				content: message,
				components: [ new MessageActionRow() .addComponents([
					new MessageButton().setCustomId('pci_inscription_accepter').setLabel('').setStyle('SUCCESS').setEmoji('✅'),
					new MessageButton().setCustomId('pci_inscription_refuser').setLabel('').setStyle('DANGER').setEmoji('❌')
				]) ]
			})
	
	/* Cases spéciales */
		case 'cleans':
			let roleRemoveTexte = 
			membre
			.roles
			.cache
			.filter( role => ['l1','l2','l3','l3 pro','m1','m2','m2-id','m2-acdi'].contains(role.name.toLowerCase()) )
			.map( v => v.name )
			.join(', ');
			await membre.roles.remove(
				membre
				.roles
				.cache
				.filter( role => ['l1','l2','l3','l3 pro','m1','m2','m2-id','m2-acdi'].contains(role.name.toLowerCase()) )
				.map( (_,k) => k )
			);
			return await interaction.reply( {content: `Les rôles ${roleRemoveTexte} vous ont été retirés.` , ephemeral : true });

		case 'info':
			return await interaction.reply( { content: 'Prochainement, si vous avez des questions contacer la modération.' , ephemeral: true});
	/* Cases interne */
		case 'accepter':
		case 'refuser':
			let [,mention,askedRole] = interaction.message.content.split`\n`;
			let id = mention.match(/<@!([0-9]+)>/)[1];

			const target = await serveur.members.fetch( id );
			if( ask == 'accepter' ) {
				target.roles.add( role.find( x => x.name.toLowerCase() === askedRole ).id );
			}
			await target.send(`Votre demande pour le rôle ${askedRole} a été ${ask}.`);
			await interaction.reply({ content : `${(ask=='accepter')?'✅':'❌'} La demande de ${target} pour rôle ${askedRole} a été ${ask} par ${membre} ` });
			return await interaction.message.delete();
	}
}