exports.run = async(bot ,data) => {

    if(parseInt(data.message_id) == bot.ID_message_d_inscription) {
        let serveur = bot.guilds.resolve( data.guild_id );
        let membre = await serveur.members.fetch( data.user_id );
        let roles = await serveur.roles.cache;
        let index = bot.Accept_inscription.indexOf( data.emoji.name );
        if( index != -1 ) { membre.roles.add( roles.find( x => x.name.replace(/ /ig,'') === bot.Accept_inscription[index]).id ); }
    } else if(parseInt(data.message_id) == bot.ID_message_spe_master) {
        let serveur = bot.guilds.resolve( data.guild_id );
        let membre = await serveur.members.fetch( data.user_id );
        let roles = await serveur.roles.cache;
        let index = bot.Accept_spe_master.indexOf( data.emoji.name );
        if( index != -1 ) { membre.roles.add( roles.find( x => x.name.replace(/ /ig,'') === bot.Accept_spe_master[index]).id ); }
    }
}