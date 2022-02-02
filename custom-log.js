// Keep a pointer to the original console
const old = console;

// New function for Date Object, (can't use arrow function to be able to use this)
Date.prototype.toLogString = () => `[ ${a.getFullYear()}/${(a.getMonth()+1).toString().padStart(2,0)}/${(a.getDay()).toString().padStart(2,0)} ${a.getHours().toString().padStart(2,0)}:${a.getMinutes().toString().padStart(2,0)} ${a.getSeconds()}' ]`;
const nowToLogString = () => (new Date()).toLogString();

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