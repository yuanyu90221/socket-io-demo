//socket.io demo server
//1. first create a http server
var http = require('http');
var url = require('url');
var fs = require('fs');
var io = require('socket.io');
var server = http.createServer(function(req, res){
	console.log('make connection');
	var path = url.parse(req.url).pathname;

	switch(path){
		case '/':
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write('default page');
			res.end();
			break;
		case '/socket.html':
		    console.log(__dirname + path);
			fs.readFile(__dirname + path, function(error, data){
				if(error){
					res.writeHead(404);
					res.write("opps this doesn't exist - 404");
				} else{
					res.writeHead(200,{'Content-Type':'text/html'});
					res.write(data,'utf8');
				}
				res.end();
			});
			break;
		
		default:
			res.writeHead(404);
			res.write("opps this doesn't exist - 404");
			res.end();
			break;
	}
});

server.listen(8080);

var serv_io = io.listen(server);// start socket io listener

serv_io.sockets.on('connection',function(socket){
	//socket.emit('message',{'message':'hello world'});
	setInterval(function(){
		//console.log(new Date());
		socket.emit('date', {'date': new Date()});
	},
	1000);

    // 接收來自於瀏覽器的資料
	  socket.on('client_data', function(data) {
	    process.stdout.write(data.letter);
	  });  
});