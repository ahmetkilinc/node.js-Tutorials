var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

var app = express();

app.use(session({secret: 'todotopsecret'}))

.use(function(req, res, next){
	
	if(typeof(req.session.todolist) == 'undefined'){
		
		req.session.todolist = [];
	}
	next();
})

.get('/yapilacaklar', function(req, res){
	
	res.render('todo.ejs', {todolist: req.session.todolist});
})

.post('/yapilacaklar/ekle/', urlencodedParser, function(req, res){
	
	if(req.body.newtodo != ''){
		
		req.session.todolist.push(req.body.newtodo);
	}
	
	res.redirect('/yapilacaklar');
})

.get('/yapilacaklar/sil/:id', function(req, res){
	
	if(req.params.id != ''){
		
		req.session.todolist.splice(req.params.id, 1);
	}
	
	res.redirect('/yapilacaklar');
})

.use(function(req, res, next){
	
	res.redirect('/yapilacaklar');
})

.listen(8080);


