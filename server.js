var express = require('express'); 

var PORT = process.env.PORT || 3000; 
var app = express(); 

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html'); 
}); 

app.get('/about', function (req, res) {
  res.sendFile(__dirname + '/about.html'); 
}); 

app.listen(PORT, function() {
  console.log('Listening on port ', PORT); 
})
