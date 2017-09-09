var express = require('express');
var compression = require('compression');
var https = require('https');

var app = express();

app.use(compression());
app.use(express.static('public'));

var PORT = process.env.PORT || 3002;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/about', function (req, res) {
  res.sendFile(__dirname + '/about.html');
});

app.listen(PORT, function () {
  console.log('Listening on port ', PORT);
})

// setInterval(function() {
//   https.get("https://arwl-game-of-life.herokuapp.com/");
// }, 180000);
