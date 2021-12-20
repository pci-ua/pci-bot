const fs = require('fs');

module.exports = function ( rawEvent ) {
	let type = rawEvent.t.toLowerCase();
	if( fs.existsSync(`./events/raw/${type}`)  ) {
		require(`./${type}/`)( rawEvent );
	}
}