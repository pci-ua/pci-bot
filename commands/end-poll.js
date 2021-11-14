const { createCanvas, registerFont } = require('canvas');
const { writeFileSync } = require('fs');
const { isMemberBotAdmin } = require('../middleware/user.js');

registerFont('NotoSansDisplay.ttf', { family: 'NotoSansDisplay' }); //https://fonts.google.com/noto/specimen/Noto+Sans+Display

async function main(interaction,bot) {

	if( ! isMemberBotAdmin(interaction.member) ) {
		interaction.reply({ content: 'Access denied', ephemeral: true});
	}

	let sondageID = interaction.options.getString('idsondage');
	if( bot.sondages[ sondageID] ) {
		const sondage = bot.sondages[ sondageID ];

		await interaction.reply({ content: 'Sondage clos, résultat soon!'});


		const suffrageTotalExprime = sondage.answer.reduce( (acc,current) => acc + current.length , 0 );
		if( suffrageTotalExprime == 0 ) {
			await interaction.editReply({ content: 'Sondage close, aucun participant ! ;('});
		} else {
			// Création
			const canvas = createCanvas(650, sondage.reponses.length * 50 );
			const dessin = canvas.getContext('2d');

			// Initialisation
			dessin.lineJoin = 'round';
			dessin.lineWidth = 20;

			const max20char = (texte) => (texte.length <= 20) ? texte : (texte.substring(0,16) + ' ...');

			// Création du graphe ligne par ligne
			for(let i=0 ; i<sondage.reponses.length ; i++ ) {
				let suffragePourI = sondage.answer[ i ].length / suffrageTotalExprime;
				// Barre résultat
				dessin.strokeStyle = '#242424';
				dessin.strokeRect( 220 + suffragePourI*100 , i*50 + 10 , (1-suffragePourI)*250 , 10 );
				if( suffragePourI > 0 ) {
					if( suffragePourI > 0.5 )
						dessin.strokeStyle = 'gold';
					else
						dessin.strokeStyle = 'teal';
					dessin.strokeRect( 220 , i*50 + 10 , suffragePourI*250 , 10 );
				}
				// Texte résultat
				dessin.fillStyle = 'white';
				dessin.font = '24px "arial"';
				dessin.fillText(`${ sondage.answer[ i ].length } (${ Math.round( suffragePourI *10000 )/100}%)` , 500 , (i+1)*50 - 25);
				// Texte réponse
				dessin.fillStyle = 'white';
				dessin.font = '20px "arial"';
				dessin.fillText( max20char(sondage.reponses[i]) , 10 , (i+1)*50 - 25);
			}

			// Sauvegarde
			writeFileSync('./data/lastSondage.png',canvas.toBuffer());
			await interaction.editReply({content: 'Sondage clos, résultat : ',files:['./data/lastSondage.png']});
		}
		delete bot.sondages[ sondageID ];
	} else {
		interaction.reply({ content: 'Sondage déjà clos ou inexistant ! ', ephemeral: true});
	}
}
module.exports = main;
