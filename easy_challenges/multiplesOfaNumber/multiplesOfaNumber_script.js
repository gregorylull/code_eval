/*
  Given numbers x and n, where n is a power of 2, print out the smallest multiple of n which is greater than or equal to x. Do not use division or modulo operator.

  INPUT SAMPLE:

  The first argument will be a path to a filename containing a comma separated list of two integers, one list per line. E.g.

  13,8
  17,16

  OUTPUT SAMPLE:

  Print to stdout, the smallest multiple of n which is greater than or equal to x, one per line. E.g.

  16
  32
*/

/*
  if no division or or modulo we can use:
  - multiplication
  - addition
  - subtraction
  - bit operation

  NAIVE solution
  keep multiplying N by some integer until it's greater

  More optimized solution
  but...
  1,000,000, 4 --> that's a lot of multiplications

  243,16 :: 240 - 256 16 * 15 vs 16 * 16

  FINAL: 256

  So...
  16, 32, 64, 128, 256 :: 243 - 128 = 115

  115, 16
  16, 32, 64, 128 :: 115 - 64 === 51 (4)

  51, 16 === 64 (4)

  128 + 64 + 64 = 256 

  previous small previous big
  then start adding until 
  
*/

(function () {
  'use strict';


/*-----------------------------------------------------------------------------
    NAIVE solution
    - add source to result until result is bigger than target
    - returns the smallest multiple of N

    4280 overall
-----------------------------------------------------------------------------*/

function naiveAddition (target, source) {
  target = parseInt(target, 10);
  source = parseInt(source, 10);
  var result = 0;
  while (result < target) {
    result += source;
  }
  return result;
}

// muuuuch slower, multiplication IS addition
function naiveMultiple (target, source) {
  var result = null;
  for (var i = 1; result < target; i++) {
    result = source * i;
  }
  return result;
}

/*-----------------------------------------------------------------------------
    OPTIMIZED
-----------------------------------------------------------------------------*/

// 100,16 :: 112
/*
  16, 32, 64, 128 :: 112 - 64 = 48

*/
var rescursiveMultiple = function (target, source, mult) {
  // defaults
  mult = mult || source;

  // if the goal is reached
  if (source === target || mult === target) { return mult; }

  
  var times2 = mult*2;

  // console.log(target, source, mult);

  // if the difference is less than 10.000, use addiion to find goal
  if (target - source < 10000) {
    return naiveAddition(target, source);

  // if source is bigger than target
  } else if ( times2 < target ) { 
    return rescursiveMultiple (target, source, times2);

  // else if multiples time2 is bigger than the current target, then the difference is found
  } else if (times2 >= target) {
  
    return mult + rescursiveMultiple(target-mult, source)
  }
}

/*
  4000, 16
  2048 :: 4000 - 2048 = 19
*/

/*-----------------------------------------------------------------------------
    RUN FUNCTION
-----------------------------------------------------------------------------*/
var fs = require('fs');
var functionToTest = rescursiveMultiple;
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
      var results = [];
      if (line !== "") {
          var args = line.split(',');
          var result = functionToTest(parseInt(args[0], 10), parseInt(args[1], 10));
          if (result !== null || result !== undefined) { results.push(result); }
      }

      if (results.length > 0) {console.log(results.join('\n'))}
  });


/*-----------------------------------------------------------------------------
    TEST
-----------------------------------------------------------------------------*/
/*

profileTime('overall time: ', function () {
  // run program

  fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
      var results = [];
      if (line !== "") {
          var result = profileTime('naive addition:', functionToTest, line.split(','));
          if (result !== null || result !== undefined) { results.push(result); }
      }

      // if (results.length > 0) {console.log(results.join('\n'))}
  });
})
*/
/*-----------------------------------------------------------------------------
    HELPER
-----------------------------------------------------------------------------*/
function profileTime (msg, func, args) {
  if (args) {
  var newArgs = [parseInt(args[0], 10), parseInt(args[1], 10)];
  }
    
  var start = Date.now();

  var result = func.apply(null, newArgs);

  var end = Date.now();

  console.log(msg, 'duration: ', end-start,', result: ', result ,', newArgs: ', newArgs, ', s/e: ', start, end);

  return result;
}
})()

/*-----------------------------------------------------------------------------
    test cases
-----------------------------------------------------------------------------*/
/*
1000000,5
1000000,25
1000000,100
10000000,5
10000000,25
10000000,100
100000000,5
100000000,25
100000000,100
1000000000,5
1000000000,25
1000000000,100
10000000000,5
10000000000,25
10000000000,100
*/
