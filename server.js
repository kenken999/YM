var http = require("http");
var url = require("url");
var router = require("./router");
var express = require("express");
var app = express();

app.use('/RESOURCES',express.static(__dirname + '/RESOURCES'));

var server = app.listen(443);

function start() {
  
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

  http.createServer(onRequest).listen(80);
  console.log("Server has started");

}
    
exports.start = start;