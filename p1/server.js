var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");
var port = 8080;

var handler = function(request, response) {
  var uri = url.parse(request.url).pathname
  var filename = path.join(process.cwd(), uri);

  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }
    if (fs.statSync(filename).isDirectory()) 
		{
			filename += '\index.html';
		}
    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
	  
	 
      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}
http.createServer(function(request, response) {
    if(request.method == 'post'||request.method == 'POST') {
        request.pipe(process.stdout);
		console.log("\n\n");
		response.writeHead(200, {'Content-Type': 'text/plain'});
		request.pipe(response);
    } else {
        handler(request, response);
    }
}).listen(port);
console.log("Server started at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");