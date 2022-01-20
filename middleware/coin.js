const { isPCiMember } = require('./user.js');

// Return how many coin the specified user have
const get = (target) => {
	return new Promise( function(resolve, reject) {
		process.db.get(`SELECT * FROM pcicoin WHERE discord_id = ${target.id}`, async function (err,row) {
			if( err ) reject(err);
			else {
				if( row != undefined ) resolve( row.amount );
				else init( target )
					.then( resolve )
					.catch( reject )
			}
		});
	});
};

// Add the specified amount to the given user , and return the new amount
const add = (amount, target) => {
	return new Promise( async function(resolve, reject) {
		process.db.get(`SELECT * FROM pcicoin WHERE discord_id = ${target.id}`, async function (err,row) {
			if( err ) reject(err);
			else {
				let newamount;
				if( row != undefined ) {
					newamount = amount + row.amount;
				} else {
					newamount = amount + (await init( target ));
				}
				process.db.run(`UPDATE pcicoin SET amount = ${newamount} WHERE discord_id = '${target.id}'`);
				resolve(newamount);
			}
		});
	});
}

// Initialize the coin amount and return it for the given user
const init = (target) => {
	return new Promise( function(resolve, reject) {
		process.db.get(`SELECT * FROM pcicoin WHERE discord_id = ${target.id}`, async function (err,row) {
			if( err ) reject(err);
			else {
				if( row != undefined ) resolve( row.amount );
				else {
					const amount = isPCiMember( target ) ? 1000 : 0;
					process.db.run(`INSERT INTO pcicoin VALUES ('${target.id}',${amount})`);
					resolve( amount );
				}
			}
		});
	});
}


// Remove the specified amount to the given user , and return the new amount
const remove = (amount, target) => add(-amount,target);


// Return the emoji strin<g representation for the coin in the given guild
const emoji = (guild) => `<:pci_coin:${ (guild.emojis.cache.find( e => e.name == 'pci_coin' ) ?? (()=>{throw new Error()})() ).id }>`;


module.exports = {
	add,
	remove,
	get,
	init,
	emoji
}