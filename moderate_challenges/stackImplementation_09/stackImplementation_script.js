/*
Write a program which implements a stack interface for integers. The interface should have ‘push’ and ‘pop’ functions. Your task is to ‘push’ a series of integers and then ‘pop’ and print every alternate integer.

INPUT SAMPLE:

Your program should accept a file as its first argument. The file contains a series of space delimited integers, one per line.

For example:

1 2 3 4
10 -2 3 4
OUTPUT SAMPLE:

Print to stdout every alternate space delimited integer, one per line.

For example:

4 2
4 -2

*/
(function () {

  var fs = require('fs');
  var results = [];


  function Stack (item) {
    this._stack = [];
    if (item) { this.push(item); }
  }

  Stack.prototype.push = function (num) {
    return this._stack.push(num);
  }

  Stack.prototype.pop = function (num) {
    return this._stack.pop();
  }

  Stack.prototype.len = function () {
    return this._stack.length;
  }

  function pushPop (line) {
    var array = line.split(' ');
    var results = [];
    var stack = new Stack();
    array.forEach(function (el) {
      stack.push(el);
    });

    var count = 1;
    while (stack.len() > 0) {
      if (count++ & 1) { results.push(stack.pop()); }
      else { stack.pop(); }
    }
    return results.join(' ');
  }

  /*-----------------------------------------------------------------------------
      RUN CODE
  -----------------------------------------------------------------------------*/
  
  fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== '') {
      results.push(pushPop(line));
    }
  });
  console.log(results.join('\n'));

})()