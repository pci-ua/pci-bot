//
// Custom additions for Array's
//

// Get a random element of an array :
Array.prototype.getRandom = function() { return this[ Math.floor( Math.random() * this.length ) ]; }
