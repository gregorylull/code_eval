(function () {
'use strict';

var fs = require('fs');
var result = [];

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
      result.push(reverseWords(line));
    }
});

console.log(result.join('\n'));

function reverseWords (line) {
  return line.split(' ').reverse().join(' ');
}

})();
