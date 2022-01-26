// Keep a pointer to the original console
const old = console;

// New function for Date Object, (can't use arrow function to be able to use this)
Date.prototype.toLogString = function () { return `[${this.toLocaleDateString()} ${this.toUTCString()}]`; }
const nowToLogString = () => {
	let now = new Date();
	return now.toLogString();
};

console.old = {};

// log
console.old.log = console.log;
console.log = (... params) => console.old.log( '\033[1;96m', '📜', nowToLogString() , ... params , '\033[0m');
// warn
console.old.warn = console.warn;
console.warn = (... params) => old.warn( '\033[1;93m', '⚠', nowToLogString() , ... params , '\033[0m');
// error
console.old.error = console.error;
console.error = (... params) => old.error( '\033[1;91m', 'ℯ', nowToLogString() , ... params , '\033[0m');