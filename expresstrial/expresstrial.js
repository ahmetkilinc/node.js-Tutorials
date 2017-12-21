var express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
	res.write("hello ahm");
    res.end();
});

app.get('/home', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
	res.write('there is no place like home.');
    res.end();
});

app.get('/ahmet', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
	res.write('ihi ihi');
    res.end();
});

app.get('/hop/:num/human', function(req, res){
	
	res.setHeader('Content-Type', 'text/plain');
	res.render('human.ejs', {num: req.params.num});
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send("hop. nope. nuke. boom");
});

app.listen(8080);
