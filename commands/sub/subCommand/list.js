const Message = require('../../../tools/message');

module.exports = async ( interaction , options ) => {
	const liste = ( ([...interaction.guild.roles.cache.filter( role => role.name.match(/🔸([a-z]+)🔸/) )]).map( k => k[1].name.replace(/🔸/g,'') ) );

	const msg = Message.embed('Liste des rôles disponibles : ','_Mis à jour régulièrement_');
	liste.forEach( role => msg.addField( role , '_._' ) );
	await interaction.reply( { content : 'Résultat:', embeds:[msg]} );
};
