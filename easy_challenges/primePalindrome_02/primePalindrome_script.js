(function () {
'use strict';

var isPrime = function (num) {
  if (num < 2) { return false; }
  var newNum = num;
  for (var i = 2; i < newNum; i++) {
    if (num % i === 0) { return false; }
    newNum = num/i;
  }
  return true;
};

// test isPrime
// var total = 0;
// for (var i = 0; i < 1000; i++) {
//   var result = isPrime(i);
//   if (result) { total++; }
// }
// console.log('total: ', total);


var isPalindrome = function (num) {
  if (typeof num !== "number") { return false; }
  if (num < 10) { return true; }
  var string = num.toString();
  for (var i = 0, len = string.length/2; i < len; i++) {
    if (string[i] !== string[string.length-1-i]) { return false; }
  }

  return true;
};

// test isPalindrome
// console.log('1', isPalindrome(1));
// console.log('121', isPalindrome(121));
// console.log('1221', isPalindrome(1221));
// console.log('9994999', isPalindrome(9994999));
// console.log('524', isPalindrome(524));
// console.log('9992519', isPalindrome(9992519));

for ( var i = 1000; i >= 2 ; i--) {
  if (isPalindrome(i) && isPrime(i)) { console.log(i); return; }
}

})();
