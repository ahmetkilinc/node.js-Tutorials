var express = require('express');
var ejs = require('ejs');
var path = require('path');

var app = express();

app.set('view engine', 'ejs')

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

	res.render('human');
});

app.get('/hop/:num/human', function(req, res){
	
	res.setHeader('Content-Type', 'text/plain');
	res.render('human', {num: req.params.num});
});

app.use(function(req, res, next){
	
	console.log('Tİme: ', Date.now())
	next();
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send("hop. nope. nuke. boom");
});

app.listen(8080);