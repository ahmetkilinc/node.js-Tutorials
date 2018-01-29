var express = require('express');

var app = express();


app.get('/ho', function(req, res){
	
	res.setHeader('Content-Type', 'text/plain');
	res.end('welewele');
});

app.listen(8080);