/*
    sample input: azbzcz;abc
    creates a map of:
      012345
      azbzcz
    a 100000
    b 001000
    c 000010
    
Then a crawler from [0,0] of that grid will move either 'right' or 'down', and try to create the longest string possible

thoughts:

01234567890
cedaefbcdca;acefdba
   a      a [3,10]
       c c  [7,9]
    e       [4]
     f      [5]
        d   [8]
      b     [6]
          a [10]
--------------
cedaefbcdca;acefdba
   a      a [3,10]
c      c c  [0,7,9]
 e  e       [1,4]
     f      [5]
  d     d   [2,8]
      b     [6]
   a      a [3,10]
--------------
01234567890
cedaefbcdca;acefdba
c      c c  [0,7,9]
 e  e       [1,4]
     f      [5]
  d     d   [2,8]
      b     [6]
   a      a [3,10]
-----------
[  0,1,2,3,4,5,6,7,8,9,10
  [0,0]
  [1,0,0,0,0,0,0,1,0,1,0]
  []
]
-----------
  01234567890
  cedaefbcdca;acefdba
a       
c
e
f
d
b
a

-----------
a  a
 b b
  cc
  dd
  e e
  f  f

*/


/*
  CRAWLER
    start on [0,0]
    results = []
    result = []
    
    sample input: azbzcz;abc
    creates a map of:
      012345
      azbzcz
    a 100000
    b 001000
    c 000010
    
    Then a crawler from [0,0] of that grid will move either 'right' or 'down', and try to create the longest string possible

    if (current spot === undefined) { out of bounds, results.push(mapToCharacter(result))}

    if (current spot === 1)
      result.push(index)
      -> go down
      result.pop()
    if (current spot === 0) 
      -> go right
      result.pop()
      -> go down
      result.pop()

*/
function nextX(array, start) {
  return array.indexOf(1, start);
}

function nextY(arrayOfArray, x, y) {
  while (arrayOfArray[y]) {
    if (arrayOfArray[y][x] === 1) {
      return y;
    }
    y++;
  }

  return y;
}

function longest (string1, string2) {
  var results = [];
  var arrayMap = characterMap(string1, string2);
  var longestLength = 0;
  var longestWord = "";
  var longerSource = string1.length < string2.length ? string2 : string1;
  var memory = [];

  // console.log(string1, string2);
  var crawler = function (arrayMap, results, result, x, y, startX, startY) {
    x = x || 0;
    y = y || 0;
    result = result || [];
    startX = startX || null;
    startY = startY || null;

    // from memory
    if (memory[y] && memory[y][x]) { return memory[y][x]; }

    // do not continue branch if there's no chance of finding longer word
    if (arrayMap.length - y + result.length < longestLength) {
      if (memory[startY] === undefined) { memory[startY] = []; }
      memory[startY][startX] = result.slice();
      startX = null;
      startY = null;
      return; 
    }
    
    if (arrayMap[y] === undefined || arrayMap[y][x] === undefined) {
      if (memory[startY] === undefined) { memory[startY] = []; }
      memory[startY][startX] = result.slice();
      startX = null;
      startY = null;

      if (result.length > longestLength) {
        longestLength = result.length;
        var newWord = mapToCharacter(longerSource, result);
        if (newWord.length > longestWord.length) {longestWord = newWord; }
        results.push(newWord);
      }
      return;
    }

    if (arrayMap[y][x] === 1) {
      result.push(x);
      if (result.length === 1 && startX !== null && startY !== null) {
        startX = x;
        startY = y;
      }

      // if spotted, move diagonal down
      crawler(arrayMap, results, result, x+1, y+1, startX, startY);
      result.pop();
  
    } 

    // ALSO SKIP
    // move right
    crawler(arrayMap, results, result, nextX(arrayMap[y], x+1), y, startX, startY);

    // move down
    // move down all the way
    crawler(arrayMap, results, result, x, y+1, startX, startY);
  }

  crawler(arrayMap, results);

  // console.log(results);
  return longestWord;
}
// given an array of arrays, create all possible combinations selecting only ONE element from each array, must pass a filter function

/*-----------------------------------------------------------------------------
    HELPER FUNC
-----------------------------------------------------------------------------*/

function characterMap (target, source) {
  if (source.length > target) {
    var temp = target;
    target = source;
    source = temp;
  }

  var results = [];
  // for (var k = 0; k < target.length; k++) { results[0].push(k); }
  for (var i = 0; i < source.length; i++) {
    var sourceChar = source[i];
    var result = []

    for (var j = 0; j < target.length; j++) {
      targetChar = target[j];

      if (sourceChar === targetChar) {
        result.push(1);
      } else {
        result.push(0);
      }
    }
    results.push(result);
  }
  return results;
}


function mapToCharacter (string1, array) {
  var result = "";
  for (var i = 0; i < array.length; i++) {
    result += string1[array[i]];
  }
  return result;
}

/*-----------------------------------------------------------------------------
  RUN PROGRAM
-----------------------------------------------------------------------------*/
// run program

  var fs = require('fs');
  var testFunction = lcs2;
  fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
      var results = [];
      if (line !== "") {
          var start = Date.now();
          var result = testFunction.apply(null, line.split(';'));
          if (result) { results.push(result); }
          var end = Date.now();
          console.log(end-start + ' msec');
      }

      if (results.length > 0) { console.log(results.join('\n')); }
  });


function lcs(a, b) {
  var aSub = a.substr(0, a.length - 1);
  var bSub = b.substr(0, b.length - 1);
 
  if (a.length === 0 || b.length === 0) {
    return '';
  } else if (a.charAt(a.length - 1) === b.charAt(b.length - 1)) {
    return lcs(aSub, bSub) + a.charAt(a.length - 1);
  } else {
    var x = lcs(a, bSub);
    var y = lcs(aSub, b);
    return (x.length > y.length) ? x : y;
  }
}

function lcs2(x,y){
  var s,i,j,m,n,
    lcs=[],row=[],c=[],
    left,diag,latch;
  //make sure shorter string is the column string
  if(m<n){s=x;x=y;y=s;}
  m = x.length;
  n = y.length;
  //build the c-table
  for(j=0;j<n;row[j++]=0);
  for(i=0;i<m;i++){
    c[i] = row = row.slice();
    for(diag=0,j=0;j<n;j++,diag=latch){
      latch=row[j];
      if(x[i] == y[j]){row[j] = diag+1;}
      else{
        left = row[j-1]||0;
        if(left>row[j]){row[j] = left;}
      }
    }
  }
  i--,j--;
  //row[j] now contains the length of the lcs
  //recover the lcs from the table
  while(i>-1&&j>-1){
    switch(c[i][j]){
      default: j--;
        lcs.unshift(x[i]);
      case (i&&c[i-1][j]): i--;
        continue;
      case (j&&c[i][j-1]): j--;
    }
  }
  return lcs.join('');
}

// var base = 'abcdefghijklmnopqrstuvwxyz';
// var string = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'
// var base = 'acefdba'
// var string = 'cedaefbcdca'
// var start = Date.now();
// for (var i = 0; i < 1; i++) {
//   var result = longest(string, base);
// }
// var end = Date.now();
// console.log(end-start, 'msec');
// console.log(result);

// console.log(mapToCharacter('abcdef', [0,2,4]));
