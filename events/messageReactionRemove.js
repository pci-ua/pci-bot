exports.run = async(bot ,data) => {
	if(parseInt(data.message_id) == bot.ID_message_d_inscription) {
		let serveur = bot.guilds.resolve( data.guild_id );

		let membre = await serveur.members.fetch( data.user_id );
		let roles = await serveur.roles.cache;
		let index = bot.Accept_inscription.indexOf( data.emoji.name );

		if( index != -1 ) { membre.roles.remove( roles.find( x => x.name.replace(/ /ig,'') === bot.Accept_inscription[index]).id ); }

		if( data.emoji.name == 'Mi' ) { membre.roles.remove( roles.find( x => x.name === 'M2').id ); membre.roles.remove( roles.find( x => x.name === 'M2-ID').id ); }
		if( data.emoji.name == 'Ma' ) { membre.roles.remove( roles.find( x => x.name === 'M2').id ); membre.roles.remove( roles.find( x => x.name === 'M2-ACDI').id ); }
	}
}
