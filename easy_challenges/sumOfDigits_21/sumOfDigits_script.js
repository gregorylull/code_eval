var fs  = require("fs");
var data = [];

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
      data.push(sumOfDigits(line));
    }
});

function sumOfDigits(num) {
  var string = typeof num === 'number' ? '' + num : num;
  var result = 0;
  string.split('').forEach(function (el) {
    result += parseInt(el, 10);
  });
  
  return result;
}
console.log(data.join('\n'));


function sumOfDigits2 (string) {
  var base = 10;
  var power = (''+ string).length;
  var result = 0;
  var diff = null;
  var num  = typeof string === 'string' ? parseInt(string) : string;

  while (power-- >= 0) {
    diff = Math.floor( num / Math.pow(base, power));
    num -= diff*Math.pow(base, power);

    result += diff;
  }

  return result;
}

// // test
// function runTest (msg, testFunc, testTries, input) {
//   testTries = testTries || 10000;
//   input = input || 12345678901235432;
//   var start = Date.now();
//   for (var i = 0; i < testTries; i++) {
//     var result = testFunc(input);
//   }
//   var end = Date.now();
//   console.log (msg, 'time: ', end-start, result);
// }

// runTest('parse: ', sumOfDigits);
// runTest('power: ', sumOfDigits2);
