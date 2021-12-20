module.exports = function(rawEvents) {
	let data = rawEvents.d;
	EmojiListe = {};
	data.emojis.filter( k => ['mm','i_'].indexOf( k.name ) != -1 ).forEach( k => { EmojiListe[k.name] = `<:${k.name}:${k.id}>` } );
	for(let channel of data.channels) {
		if( channel.name.match(/welcome/) ) {
			update( data, channel , EmojiListe );
		}
	}
}


async function update(server,channel,emojis) {
	const serveur = bot.guilds.cache.get( server.id );
	const salon = await serveur.channels.fetch( channel.id );

	if( salon.lastMessageId != null ) {
		try {
			await salon.messages.fetch( salon.lastMessageId );
			return;
		} catch( err ) {
			// Aucun message ou message supprimé on continue
		}
	}

	const Aa = new MessageActionRow() .addComponents( [
		new MessageButton().setCustomId('pci_inscription_l1').setLabel('L1').setStyle('PRIMARY'),
		new MessageButton().setCustomId('pci_inscription_l2').setLabel('L2').setStyle('PRIMARY'),
		new MessageButton().setCustomId('pci_inscription_l3').setLabel('L3').setStyle('PRIMARY'),
		new MessageButton().setCustomId('pci_inscription_l3pro').setLabel('L3Pro').setStyle('PRIMARY')
	] );
	const Ab = new MessageActionRow() .addComponents( [
		new MessageButton().setCustomId('pci_inscription_m1').setLabel('M1').setStyle('PRIMARY'),
		new MessageButton().setCustomId('pci_inscription_m2id').setLabel('M2 ID').setStyle('PRIMARY'),
		new MessageButton().setCustomId('pci_inscription_m2acdi').setLabel('M2 ACDI').setStyle('PRIMARY')
	] );

	const Ba = new MessageActionRow() .addComponents( [
		new MessageButton().setCustomId('pci_inscription_enseignant').setLabel('Enseignant').setStyle('SECONDARY').setEmoji('🧑‍🏫'),
		new MessageButton().setCustomId('pci_inscription_doctorant').setLabel('Doctorant').setStyle('SECONDARY').setEmoji('📔')
	] );
	const Bb = new MessageActionRow() .addComponents( [
		new MessageButton().setCustomId('pci_inscription_externe').setLabel('Externe').setStyle('SECONDARY').setEmoji('👤'),
		new MessageButton().setCustomId('pci_inscription_alumni').setLabel('Alumni').setStyle('SECONDARY').setEmoji('🎓')
	] );

	const C = new MessageActionRow() .addComponents( [
		new MessageButton().setCustomId('pci_inscription_cleans').setLabel('Retrait rôle').setStyle('DANGER').setEmoji('🗑'),
		new MessageButton().setCustomId('pci_inscription_info').setLabel('Information').setStyle('SUCCESS').setEmoji('ℹ️')
	] );

	await salon.send( {
		'content': "⠀",
		'files': [ './bvn.png' ]
	} );
	await salon.send( {
		'content': `Bienvenue sur le discord de **PC${emojis["i_"]}** : Projets et Cohésion en Informatique, association des étudiants en informatique de l'Université d'Angers.` + '\n' + `L'association **PC${emojis["i_"]}** propose divers services aux étudiants de la filière informatique de l'Université d'Angers et est ouverte à toutes et à tous.`
	} );
	await salon.send( {
		'content': "⠀",
		'files': [ './rules.png' ]
	} );
	await salon.send( {
		'content': `
${emojis["mm"]}  Discussion ➔ Gardez un langage correct ( ~~insulte~~, ~~provocation~~, ~~prosélytisme~~, ~~NSFW~~ )
${emojis["mm"]}  Pseudo ➔ Votre nom (ou son initial) et votre prénom doivent figurer dans votre pseudo mais il reste libre.
${emojis["mm"]}  Publicité ➔ Toute promotion doit être validée par un membre de la modération.
${emojis["mm"]}  Fichier  ➔ Hameçonnage, logiciel malveillant et assimilé sont évidemment proscrits
${emojis["mm"]}  Jurisprudence ➔ Tout événement ou élément non cité ici reste à l'appréciation de la modération du serveur
${emojis["mm"]}  Sanction  ➔ La modération ne fixe que des sanctions temporaires, seul le bureau fixe des sanctions définitives dans des cas extrêmes

Si vous avez un doute, une question @Mod reste à votre disposition
`
	} );
	await salon.send( {
		'content': "⠀",
		'files': [ './signin.png' ]
	} );
	await salon.send( {
		'content': `
Si c'est la première fois que vous utilisez discord, un tutoriel est accessible ► <#753941718704848906>

Pour accéder aux autres channels, il faut indiquer votre niveau d'étude à l'UA :
_ Les rôles dans les carrés gris sont soumis à une vérification manuelle, les tuteurs sont affectés manuellement. _
`
	} );
	/* U+2800   Braille blank pattern   &#10240; */
	await salon.send( {
		'content': "⠀",
		'components': [Aa,Ab]
	} );
	await salon.send( {
		'content': "⠀",
		'components': [Ba,Bb]
	} );
	await salon.send( {
		'content': "⠀",
		'components': [C]
	} );


}
