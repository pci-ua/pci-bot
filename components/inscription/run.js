module.exports = async function(interaction) {
	console.log( interaction.customId );
	await interaction.reply('Dév...',{ephemeral:true});
}