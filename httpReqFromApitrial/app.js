var http = require('http');
var fs = require('fs');
const https = require('https');

var hops;

// Loading the file index.html displayed to the client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});






//get request from an api.

https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {

  let data = '';

  //A chunk of data has been recieved.
  resp.on('data', (chunk) => {
	  
    data += chunk;
  });

  //The whole response has been received. Print out the result.
  resp.on('end', () => {
	  
    hops = JSON.parse(data).explanation;
  });

}).on("error", (err) => {
	
  console.log("Error: " + err.message);
});









// Loading socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket, username) {
    // When the client connects, they are sent a message
    //socket.emit('message', 'You are connected!');
    // The other clients are told that someone new has arrived
    socket.broadcast.emit('message', 'Another client has just connected!');

    // As soon as the username is received, it's stored as a session variable
    socket.on('little_newbie', function(username) {
		
        socket.username = username;
    });
	
	socket.emit('hops', hops);

    // When a "message" is received (click on the button), it's logged in the console
    socket.on('message', function (message) {
        // The username of the person who clicked is retrieved from the session variables
		
		if(socket.username == null || socket.username == "" || socket.username == undefined){
			
			console.log('x is speaking to me! She is saying: ' + message);
			socket.emit('username', "x");
		}
		else{
			
			console.log(socket.username + ' is speaking to me! She is saying: ' + message);
			socket.emit('username', socket.username);
			socket.emit('hops', hops);
		}
        
    }); 
});


server.listen(8080);