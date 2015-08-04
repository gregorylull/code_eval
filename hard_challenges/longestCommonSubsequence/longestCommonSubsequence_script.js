/*

  a b c d e f

  a b d a b c d e f

  WAIT! thought process wrong! ..?

  a xyz

  xyz abc

  abcde  ; azbzczdze

  a
  a b c
  a c ..

  NAIVE approach

  - take first character from string 1
  - go through string2 until a match is hit
    + record index as latest index
    + push to answer array
  - take second character from string1
    + starting from latest index, check until match is hit
      + record index as latest
      + push to answer array...

  THIS IS A RECURSIVE PROBLEM!

  0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000

*/

(function () {
  'use strict';

  var fs = require('fs');

  // takes a string and creates a map of all its characters and their locations in the string
  // assuming only ascii characters up to 255
  var preProcess = function (string) {
    if (typeof string !== 'string' || !string ) { return ""; }
    var dictionary = Array(256);
    for (var i = 0; i < string.length; i++) {
      var character = string[i];
      var code = character.charCodeAt(0);
      if (!Array.isArray(dictionary[code])) {
        dictionary[code] = [];
      }

      dictionary[code].push(i);
    }
    return dictionary;
  };

  // test preProcess
  // var text0 = "abcdefabcdef"
  // console.log(preProcess(text0));

  // var compareString = function (str1, str2Post) {
  //   result = "";
  //   longest = "";
  //   latestIndex = null;
  //   for (var i = 0; i < str1.length; i++) {
  //     var character = str1[0];
  //     var code = str1.charCodeAt(0);

  //     if (str2Post[code]) {
  //       for (var j = 0; j < str2Post[code]; j++) {

  //       }
  //     }
  //   }
  // };
  
  // XMJYAUZ
  // MZJAWXU
  // 0123456

  // this method failed, it is greedy and does not catch cases abcd acdb
  // var longestCommonSubsequence = function (str1, str2) {
  //   var lastIndex = 0;
  //   var longest = "";
  //   var result = "";

  //   for (var k = 0; k < str1.length; k++) {
  //       var reachedEnd = false;

  //     for (var i = k; i < str1.length && !reachedEnd; i++) {
  //       var str1Char = str1[i];
  //       var matchFound = false;

  //       for (var j = lastIndex; j < str2.length && !matchFound; j++) {
  //         var str2Char = str2[j];

  //         // if there is a matching character in str2, we add to a result string
  //         // we set the lastIndex to what we found in str2
  //         if (str1Char === str2Char) {
  //           result += str2Char;
  //           lastIndex = j;
  //           matchFound = true;
  //         }

  //         //
  //         if (lastIndex === str2.length-1) {
  //           if (result.length > longest.length) {
  //             longest = result;
  //           }
  //           reachedEnd = true;
  //           result = "";
  //           lastIndex = 0;
  //         }
  //       }
  //     }
  //   }
    
  //   return longest || false;
  // };

  


// run program
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    var results = [];
    if (line !== "") {
        var result = longestCommonSubsequence.apply(null, line.split(';'));
        if (result) { results.push(result); }
    }

    if (results.length > 0) {console.log(results.join('\n'))}
});

})()
