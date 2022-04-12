const { isMemberBotAdmin } = require('../../middleware/user.js');
const { add } = require('../../middleware/coin.js');
const { Graph , GraphElement } = require('../../module/graph.js');

async function main(interaction,bot) {

	// Permission
	if( ! isMemberBotAdmin(interaction.member) ) {
		return await interaction.reply({ content: 'Access denied', ephemeral: true});
	}

	// Existance
	let sondageID = interaction.options.getString('idsondage');
	if( ! bot.sondages[ sondageID] ) {
		return await interaction.reply({ content: 'Sondage déjà clos ou inexistant ! ', ephemeral: true});
	}

	// Délais
	let delay = interaction.options.getInteger('delay') ?? 0;
	if(delay > 0) {
		await interaction.reply(`Résultat prévu pour ${new Date( (+new Date())+ delay*1000 ).toLogString() }`);
		await new Promise( (resolve) => setTimeout(resolve,delay*1000) );
		// Existance après délais
		let sondageID = interaction.options.getString('idsondage');
		if( ! bot.sondages[ sondageID] ) {
			return await interaction.editReply('Sondage obsolète');
		} else {
			if( delay < 150 ) { // Webhook close after a period of time so do not try to edit
				await interaction.editReply('Résultat ✓');
			}
		}
	} else {
		await interaction.reply('Résultat soon ...');
	}

	// Génération réponse :
	const sondage = bot.sondages[ sondageID ];
	const salon = interaction.channel;
	let suffrageTotalExprime = sondage.answer.reduce( (acc,current) => acc + current.length , 0 );

	if( suffrageTotalExprime == 0 ) {
		await salon.send({ content: 'Sondage clos, aucun participant ! 😰'});
	} else {
		// Mapping data
		let liste = sondage.answer.map( (v,i) => new GraphElement(sondage.reponses[i],v.length,v.length/suffrageTotalExprime) );
		let correctID = interaction.options.getInteger('correctindex');


		// Création graphe résultat / vote
		let graphe = new Graph( liste , correctID , '' );
		let basicPath = graphe.write('suffrage');

		// Gestion parti coin
		if( sondage.type == 'pari' ) {
			// Mapping data coin
			let listeCoin = sondage.reponses.map( (v) => new GraphElement(v,0,0) );
			sondage.answer.forEach( (v,i) => v.forEach( id => listeCoin[i].flatValue += sondage.mise[id] ) );
			let coinTotalMise = listeCoin.reduce( (total,current) => total + current.flatValue , 0 );
			listeCoin.forEach( (v) => v.prctValue = v.flatValue / coinTotalMise );

			// Création graphe
			let grapheCoin = new Graph( listeCoin , correctID , 'coin' );
			let coinPath = grapheCoin.write('mise');

			// Gestion coin
			correctID = correctID ?? listeCoin.reduce( (bestI,nowV,nowI,arr) => (arr[bestI].flatValue<nowV.flatValue)?nowI:bestI , 0 );
			let coinWinnerCount = listeCoin[correctID].flatValue;
			let l = [];
			for(let i=0 ; i<sondage.answer[correctID].length ; i++) {
				let uid = sondage.answer[correctID][i];
				let gain = Math.ceil((coinTotalMise - coinWinnerCount)*(sondage.mise[uid]/coinWinnerCount))+1+sondage.mise[uid];
				l.push(add(gain,{id:uid}));
			}
			await Promise.all( l );

		// Envoi réponse
			await salon.send({content: `Sondage clos,\n**${sondage.question}**\nrésultat : `,files:[basicPath, coinPath]});
		} else {
			await salon.send({content: `Sondage clos,\n**${sondage.question}**\nrésultat : `,files:[basicPath]});
		}
	}
	delete bot.sondages[ sondageID ];
}
module.exports = main;
