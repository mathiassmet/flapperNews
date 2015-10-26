var http = require('http');

http.createServer(function(request, response){
	request.on('data', function(chunk){
		console.log(chunk.toString());
	});
	response.end();
}).listen(8080);