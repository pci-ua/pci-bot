const { createCanvas } = require('canvas');
const { writeFileSync } = require('fs');
const { isMemberBotAdmin } = require('../middleware/user.js');
const { add } = require('../middleware/coin.js');

async function main(interaction,bot) {

	let delay = interaction.options.getInteger('delay');
	if( delay ) {
		await interaction.deferReply({ ephemeral: true })
		await new Promise( (resolve) => setTimeout(resolve,delay*1000) );
	}

	if( ! isMemberBotAdmin(interaction.member) ) {
		interaction.editReply({ content: 'Access denied', ephemeral: true});
	}

	let sondageID = interaction.options.getString('idsondage');
	if( bot.sondages[ sondageID] ) {
		const sondage = bot.sondages[ sondageID ];

		await interaction.editReply({ content: 'Sondage clos, résultat soon!',ephemeral:false});


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

			let bestID = sondage.answer.map( k => k.length ).reduce((bestIndex,currentAmount,currentIndex,arr)=>arr[bestIndex]<currentAmount?currentIndex:bestIndex,0);
			// Création du graphe ligne par ligne
			for(let i=0 ; i<sondage.reponses.length ; i++ ) {
				let suffragePourI = sondage.answer[ i ].length / suffrageTotalExprime;
				// Barre résultat
				dessin.strokeStyle = '#242424';
				dessin.strokeRect( 220 + suffragePourI*250 , i*50 + 10 , (1-suffragePourI)*250 , 10 );
				if( suffragePourI > 0 ) {
					if( i == bestID )
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

			if( sondage.type == 'pari' ) {
				// Création
				const canvas_ = createCanvas(650, sondage.reponses.length * 50 );
				const dessin_ = canvas_.getContext('2d');

				// Initialisation
				dessin_.lineJoin = 'round';
				dessin_.lineWidth = 20;

				let data = sondage.answer.map( ids => ids.map( id => sondage.mise[id] ).reduce( (a,b) => a+b, 0 ) )
				let bestID = data.reduce((bestIndex,currentAmount,currentIndex,arr)=>arr[bestIndex]<currentAmount?currentIndex:bestIndex,0);
				let count = data.reduce( (a,b) => a+b , 0)
				let correctID = interaction.options.getInteger('correctindex') ?? bestID;
				// Création du graphe ligne par ligne
				for(let i=0 ; i<data.length ; i++ ) {
					let suffragePourI = data[ i ] / count;
					// Barre résultat
					dessin_.strokeStyle = '#242424';
					dessin_.strokeRect( 220 + suffragePourI*250 , i*50 + 10 , (1-suffragePourI)*250 , 10 );
					if( suffragePourI > 0 ) {
						if( i == correctID )
							dessin_.strokeStyle = 'lime';
						else if( i == bestID )
							dessin_.strokeStyle = 'gold';
						else
							dessin_.strokeStyle = 'teal';
						dessin_.strokeRect( 220 , i*50 + 10 , suffragePourI*250 , 10 );
					}
					// Texte résultat
					dessin_.fillStyle = 'white';
					dessin_.font = '24px "arial"';
					dessin_.fillText(`${ data [ i ] } coin (${ Math.round( suffragePourI *10000 )/100}%)` , 500 , (i+1)*50 - 25);
					// Texte réponse
					dessin_.fillStyle = 'white';
					dessin_.font = '20px "arial"';
					dessin_.fillText( max20char(sondage.reponses[i]) , 10 , (i+1)*50 - 25);

				}
				writeFileSync('./data/lastMoneySondage.png',canvas_.toBuffer());

				let winnerCount = data[ correctID ];
				let l = [];
				for(let i=0 ; i<sondage.answer[correctID].length ; i++) {
					let uid = sondage.answer[correctID][i];
					let gain = Math.ceil((count - winnerCount)*(sondage.mise[uid]/winnerCount))+1+sondage.mise[uid];
					l.push(add(gain,{id:uid}));
				}
				await Promise.all( l );

				await interaction.editReply({content: 'Sondage clos, résultat : ',files:['./data/lastSondage.png','./data/lastMoneySondage.png']});
			} else {
				await interaction.editReply({content: 'Sondage clos, résultat : ',files:['./data/lastSondage.png']});
			}

			
		}
		delete bot.sondages[ sondageID ];
	} else {
		interaction.editReply({ content: 'Sondage déjà clos ou inexistant ! ', ephemeral: true});
	}
}
module.exports = main;
