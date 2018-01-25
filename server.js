var http = require("http");
//var url = require("url");
//var router = require("./router");
//var express = require("express");
//var app = express();

//app.use('/RESOURCES',express.static(__dirname + '/RESOURCES'));

//var server = app.listen(5050);

function start() {
  
  function onRequest(request,response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World!?");
  }
  /*
  function onRequest(request, response) {

    var pathname = url.parse(request.url).pathname
    console.log("Request for " + pathname + " received.");
    
    var postData = "";
    request.setEncoding("utf8");
    
    request.addListener("data", function(x){
      postData += x;
    });

    request.addListener("end", function(){
      router.route(pathname, response, postData);
    });
    
  }
*/
 var port = process.env.PORT || 1337;
  http.createServer(onRequest).listen(port);
  console.log("Server has started");

}
    
exports.start = start;