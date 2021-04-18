const Discord = require('discord.js');

exports.embed = ( title , desc ) => new Discord.MessageEmbed()
	// valeur commune
        .setColor('#0099ff')
        .setThumbnail('https://cdn.discordapp.com/icons/672022288476143636/2fb81e0fcd9a3fb98932ff307b2dcf6d.png')
        .setFooter(
		'Si vous avez un problème n\'hesitez pas à contacter le staff de PCi',
		'https://cdn.discordapp.com/icons/672022288476143636/2fb81e0fcd9a3fb98932ff307b2dcf6d.png'
	)
        .setTimestamp()
	// paramètre
        .setTitle( title )
        .setDescription( desc );
