exports.run = async(bot ,data) => {
	if(parseInt(data.message_id) == bot.config.ID_message_d_inscription) {
		let serveur = bot.guilds.resolve( data.guild_id );
		let membre = await serveur.members.fetch( data.user_id );
		let roles = await serveur.roles.cache;
		//rôle sans vérification
		let index = bot.config.Accept_inscription.indexOf( data.emoji.name );
		if( index != -1 ) { membre.roles.add( roles.find( x => x.name.replace(/ /ig,'') === bot.config.Accept_inscription[index]).id ); }
		if( data.emoji.name == 'Mi' ) { membre.roles.add( roles.find( x => x.name === 'M2').id ); membre.roles.add( roles.find( x => x.name === 'M2-ID').id ); return;}
		if( data.emoji.name == 'Ma' ) { membre.roles.add( roles.find( x => x.name === 'M2').id ); membre.roles.add( roles.find( x => x.name === 'M2-ACDI').id ); return;}
		if( index != -1) { return; }
		//rôle avec vérification
		let complex = bot.config.Verif_inscription.indexOf( data.emoji.name );
		if( complex != -1) {
			let salon = await bot.channels.fetch( bot.config.pingRoleChannelId );
			let message = `${membre} vien de demander le rôle ${serveur.emojis.resolve(data.emoji.id)} (${(new Date()).toLocaleString()})`;
			salon.send( message );
			membre.send( `Votre demande va être traitée dans les plus bref délais par la modération merci de bien vouloir patienter cordialement.` );
		}
	}
}
