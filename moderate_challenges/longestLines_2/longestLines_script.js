/*
Write a program which reads a file and prints to stdout the specified number of the longest lines that are sorted based on their length in descending order.

INPUT SAMPLE:

Your program should accept a path to a file as its first argument. The file contains multiple lines. The first line indicates the number of lines you should output, the other lines are of different length and are presented randomly. You may assume that the input file is formatted correctly and the number in the first line is a valid positive integer.

For example:

Hello World
CodeEval
Quick Fox
A
San Francisco
OUTPUT SAMPLE:

Print out the longest lines limited by specified number and sorted by their length in descending order.

For example:

San Francisco
Hello World

this problem is about sorting numbers

- Not sure how many i would have to display, so can't keep a record of 'longest' vs 'secondLongest' vs 'third...' and so forth

Naive:
- push all the a intermediate result array
- sort array based on item length

*/

/*
  If i didn't know the number of items to display, this owuld be a problem.

  But I DO know in this case, so what can i do?

  Imagine this: display 5 items

  array?
  linklist?
  tree?

*/

(function () {

var fs = require('fs');
var results = [];
var intermediate = [];
var numberToDisplay = null;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line, index) {
  if (index === 0) {
    numberToDisplay = parseInt(line, 10);
  } else if (line !== "") {
    intermediate.push(line);
  }
});

intermediate.sort(function (a,b) {
  if (a.length < b.length) {
    return 1
  } else if (a.length > b.length) {
    return -1
  } else {
    return 0;
  }
});

for (var i = 0; i < numberToDisplay; i++ ) {
  results.push(intermediate[i]);
}

console.log(results.join('\n'));

})()