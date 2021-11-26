//
// Custom modification for console
//

// Before doing anything we save all old console function name :
const allOldName = Object.entries(console).filter( e => typeof e[1] == 'function' ).map( k => k[0] );

// old version will still be accessible using console.old
const old = console;

// used to print timestamp in logs
const nowToLogString = () => {
	let now = new Date();
	return `[${now.toLocaleDateString()} ${now.toUTCString()}]`;;
};

const notDoneYet = ( name ) => { return () => {console.old.old(`Not yet re-implemented pleas use console.old.${name} for now! You can also reimplement it!`)} };

console = { old };
allOldName.forEach( oldName => console[oldName] = notDoneYet(oldName) );

console.clear = () => { console.old.clear(); }
console.debug = (...k) => { console.debug('\u001b[38;2;255;255;255m','🐛',nowToLogString(),...k, '\033[0m'); }
console.error = (...k) => { console.error('\u001b[38;2;255;020;020m','❌',nowToLogString(),...k, '\033[0m'); }
console.info  = (...k) => { console.info ('\u001b[38;2;255;225;110m','🛈', nowToLogString(),...k, '\033[0m'); }
console.warn  = (...k) => { console.warn ('\u001b[38;2;255;200;000m','⚠', nowToLogString(),...k, '\033[0m'); }
console.log   = (...k) => { console.log  ('\u001b[38;2;150;255;240m','📜',nowToLogString(),...k, '\033[0m'); }
