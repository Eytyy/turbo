var express = require('express');
var app = express();

var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/dest'));

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(port, function() {
  console.log('App is running on' + port);
})
