var http = require('http');
var url = require('url');
var querystring = require('querystring');
var EventEmitter = require('events').EventEmitter;

var firstmodule = require('firstmodule');

var game = new EventEmitter();

game.on('name', function(message){
   
   console.log(message);
});

var server = http.createServer(function (req, res) {
	
	var page = url.parse(req.url).pathname;
	
    var params = querystring.parse(url.parse(req.url).query);
	
	res.writeHead(200, {'Content-Type': 'text/html'});
	
	if(page == '/'){
	
		res.write("hey there, welcome to the page!");
	}
	else if(page == '/home'){
		
		if('firstname' in params){
			
			res.write(params['firstname']);
			game.emit('name', params['firstname']); //bir fonk a veri emit ediyoruz. istediğimiz zaman.
			firstmodule.sayHello();
		}
		else{
			
			res.write("ow where is your name? please.");
		}
	}
	else{
		
		res.write("go out please. its a 404 page.");
		
	}
	
    res.end();
	
});

server.on('close', function(){
	
	console.log("byebye");
})

server.listen(8080);



