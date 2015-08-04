/*
Given a sequence, write a program to detect cycles within it.

INPUT SAMPLE:

Your program should accept as its first argument a path to a filename containing a sequence of numbers (space delimited). The file can have multiple such lines. E.g

2 0 6 3 1 6 3 1 6 3 1
3 4 8 0 11 9 7 2 5 6 10 1 49 49 49 49
1 2 3 1 2 3 1 2 3
OUTPUT SAMPLE:

Print to stdout the first cycle you find in each sequence. Ensure that there are no trailing empty spaces on each line you print. E.g.

6 3 1
49
1 2 3
The cycle detection problem is explained more widely on wiki 
Constrains: 
The elements of the sequence are integers in range [0, 99] 
The length of the sequence is in range [0, 50]

Strategy:
  - There is a crawler, which is outer forloop that keeps track of which index we're on. THe crawler is the START of the source substring
  - To create the subsection OR source sub string, we'll have a subsection divider that is the inner loop
  - The 'source' substring starts from the crawler, up to the sub divider, is compared the target substring starting from the subdivider, and ending at plus the length of source substring
    + ONLY compare (or continue forloop) when the source substring's length is equal or less than the length of the target string
      + OR, before even creating substring, check remaining characters, which is the potential of the target substring. So if remaning characters (string.length - subdivider)
  - each comparison is array vs array right now...

*/

(function () {
  'use strict';
  var fs = require('fs');
  var results = [];

  fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
      results.push(detectingCycles(line));
    }
  });

  console.log(results.join('\n'));

  function detectingCycles (line) {
    var array = line.split(' ');
    var crawler = 0;
    var subdivider = 1;
    var remainingLength = array.length - subdivider;
    var sourceLength = subdivider - crawler;
    var longestCycle = 0;
    var tempCount = 0;
    var longestPattern = "";
    var sourceString = "";
    var targetString = null;
    var newSub = null;

    for (crawler = 0; crawler < array.length; crawler++) {
      sourceString = array[crawler];
      sourceLength = 1;
      remainingLength = array.length - crawler + 1;


      for (subdivider = crawler + 1; sourceLength <= remainingLength; subdivider++) {
        sourceString = array.slice(crawler, subdivider).join('');
        targetString = array.slice(subdivider, subdivider + subdivider - crawler).join('');

        newSub = subdivider;
        while (sourceString === targetString) {
          tempCount++;
          newSub += subdivider - crawler;
          targetString = array.slice(newSub, newSub + subdivider - crawler).join('');
          // console.log(sourceString, targetString, newSub, subdivider, typeof sourceString, typeof targetString);
        }

        if (tempCount > longestCycle) {
          longestCycle = tempCount;
          longestPattern = array.slice(crawler, subdivider).join(' ');
        }

        tempCount = 0;
        sourceLength++;
        remainingLength--;
      }
    }

    return longestPattern;
  }
  
}) ()
