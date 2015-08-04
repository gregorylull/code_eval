var fs  = require("fs");
var data = [];

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
      data.push(line.toLowerCase());
    }
});

console.log(data.join('\n'));