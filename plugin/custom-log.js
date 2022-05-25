
// New function for Date Object, (can't use arrow function to be able to use this)
Date.prototype.toLogString = function () { return `[ ${this.getFullYear()}/${(this.getMonth()+1).toString().padStart(2,0)}/${(this.getDate()).toString().padStart(2,0)} ${this.getHours().toString().padStart(2,0)}:${this.getMinutes().toString().padStart(2,0)} ${this.getSeconds().toString().padStart(2,' ')}' ]`; }
const nowToLogString = () => (new Date()).toLogString();

console.old = {};

// log
console.old.log = console.log;
console.log = (first, ... params) => {
	console.old.log( '\033[1;96m', '📜', nowToLogString() , first , '\033[0m' );
	for(let i=0 ; i<params.length ; i++) {
		console.log(  '\033[1;96m' , ( i+1 == params.length ) ? ' ╠ ' : ' ╚ '  , params[i] , '\033[0m' )
	}
}

// warn
console.old.warn = console.warn;
console.warn = (... params) => console.old.warn( '\033[1;93m', '⚠', nowToLogString() , ... params , '\033[0m');
// error
console.old.error = console.error;
console.error = (... params) => console.old.error( '\033[1;91m', 'ℯ', nowToLogString() , ... params , '\033[0m');
