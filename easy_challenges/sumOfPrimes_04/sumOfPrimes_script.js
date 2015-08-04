(function () {
'use strict';

// isPrime returns true or false
var isPrime = function (num) {
  if (typeof num !== 'number' || num < 2) { return false; }
  var newNum = num;
  for (var i = 2; i < newNum; i++) {
    if (num % i === 0) { return false; }
    newNum = num / i;
  }
  return true;
};

// // test isPrime
// var total = 0;
// for (var i = 0; i < 1000; i++) {
//   var result = isPrime(i);
//   if (result) { total++; }
// }
// console.log('total: ', total);

var totalPrimes = 0;
var result = 0;
for (var i = 2; totalPrimes < 1000; i++) {
  if (isPrime(i)) {
    result += i;
    totalPrimes++;
  }
}

// console.log('totalPrimes: ', totalPrimes);
console.log(result);

})();
