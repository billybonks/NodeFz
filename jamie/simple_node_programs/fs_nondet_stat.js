/*
  Simple non-deterministic application.
  Non-determinism is due to threadpool.
*/

var fs = require("fs");

var runForever = (process.argv[2] && process.argv[2] == '--forever');

fs.writeFileSync("/tmp/foo", "AAAAAA");
console.log('APP: Started file with AAAAAA');

/* Race! */
fs.stat("/tmp/foo", function (err, stats) {
  if (err) {
    console.log("APP: stat failed -- no such file");
  }
  else {
    console.log("APP: isFile ? " + stats.isFile());
  }
});

fs.unlink("/tmp/foo", function (err) {
  console.log("APP: unlink finished");
});

if (runForever)
{
  //Start reading from stdin so we don't exit.
  process.stdin.resume();
}
