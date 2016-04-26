var http = require('http');
var fs = require("fs");

http.createServer(function(request, response) {

	if(request.url === "/"){
		sendFileContent(response, "rockmine.html", "text/html");
	}
	else if(/^\/[a-zA-Z0-9\/\-\_]*.html$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/html");
	}
	else if(/^\/[a-zA-Z0-9\/\-\_]*.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if(/^\/[a-zA-Z0-9\/\-\_]*.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
	else if(/^\/[a-zA-Z0-9\/\-\_]*.png$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/png");
	}
	else if(/^\/[a-zA-Z0-9\/\-\_]*.jpg$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/jpeg");
	}
	else if(/^\/[a-zA-Z0-9\/\-\_]*[a-zA-Z]$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/plain");
	}
	else{
		console.log("Requested URL is: " + request.url);
		response.end();
	}
}).listen(80);

function sendFileContent(response, fileName, contentType){
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
			response.write(err.toString());
		}
		else{
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		}
		response.end();
	});
}

