/*

Given three numbers, (n, p1, p2), determine if the bits in p1 and p2 position are the same or not in n

  sample input:
    86, 2, 3
    125, 1, 2

  output:
    true
    false


86 = 64 + 16 + 4 + 2
128 64 32 16 8 4 2 1 
  7  6  5  4 3 2 1 0
  0  1  0  1 0 1 1 0
               p2p1

126 = 64 + 32 + 16 + 8 + 4 + 2
  0  1  1  1  1 1 1 0
                  p2p1

SO...let's think about this
- the bit positions can be anywhere along the numbers? maybe even exceeds?
- how do you determine if two bits are the same?
- how do you convert a number to bits?
- do i even NEED to convert a number to bits?
- can i create a number from bits?

parseInt can go from string to number...

AND
OR
XOR

And if we don't know anything about bit manipulation?

We need to convert a number to bits.


*/

/*-----------------------------------------------------------------------------
    main function
-----------------------------------------------------------------------------*/

function bitPositions (num, p1, p2) {
  var string = (num >>> 0).toString(2);
  if (p1 > string.length || p2 > string.length) { return false; }
  return string[string.length - p1] === string[string.length - p2];
}


/*-----------------------------------------------------------------------------
    HELPER
-----------------------------------------------------------------------------*/

// converts a number to its bit representation
// returns an array of ones/zeros unless 'returnString' is set to True, which then returns a stringified version
function numToBits (number, returnString) {
  var result = [];
  for (var i = 0; i < number; i++) {
    result[i] = (number >> i) & 1;
  }

  return returnString ? result.join('') : result;
}

/*-----------------------------------------------------------------------------
    RUN FUNCTION
-----------------------------------------------------------------------------*/
var fs  = require("fs");
var data = [];

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
      var result = line.split(',').map(function (el) { return parseInt(el, 10); });
      data.push(bitPositions.apply(null,result));
    }
});

console.log(data.join('\n'));

