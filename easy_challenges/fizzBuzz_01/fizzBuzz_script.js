//Sample code to read in test cases:
(function () {
'use strict';

var fs  = require("fs");
var path = "./";
var data = [];
var answer = "";

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
        proccessLine(line, data);
    }
});

console.log(data.join('\n'));

// HELPER FUNCTIONS

// 
function proccessLine (line, result) {
  var split = line.split(" ");
  result.push(fizzBuzz.apply(null, split));
}

// returns an array of arrays, assuming more than one line
function fizzBuzz (firstMultiple, secondMultiple, end) {
  var result = [];
  for (var i = 1; i <= end; i++) {
    var modFirst = i % firstMultiple === 0;
    var modSecond = i % secondMultiple === 0;

    if (modFirst && modSecond) {
      result.push('FB');
    } else if (modFirst) {
      result.push('F');
    } else if (modSecond) {
      result.push('B');
    } else {
      result.push(i);
    }
  }
  return result.join(" ");
}

})();
