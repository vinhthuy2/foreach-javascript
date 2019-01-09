// randomly generated N = 40 length array 0 <= A[N] <= 39
var randomArray = (N) => Array.from({ length: N }, () => Math.floor(Math.random() * N));
module.exports.randomArray = randomArray;