

"use strict";

var fs = require('fs');  
var path = require('path');  
var https = require('https');
var http = require("http");
var url = require("url");
var mime = require('mime');


var staticBasePath = './www';

var staticServe = function(req, res) {  
    
    if (req.url === "/") {
      req.url = req.url + "index.html";
    }
        
    var filename = path.resolve(staticBasePath);
    filename = path.join(filename, req.url);

    fs.exists(filename, function (exists) {
        if (!exists) {
            res.writeHead(404, {
                "Content-Type": "text/plain"
            });
            res.write("404 Not Found\n");
            res.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, "binary", function (err, file) {
            if (err) {
                response.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                res.write(err + "\n");
                res.end();
                return;
            }

            var type = mime.lookup(filename);
            res.writeHead(200, {
                "Content-Type": type
            });
            res.write(file, "binary");
            res.end();
        });
    });

};


var httpsServer = https.createServer({
    key: fs.readFileSync('server-key.pem'),
    cert: fs.readFileSync('server-cert.pem')
}, staticServe);

var port = 8080;
console.log('Listening on port %s', port);
httpsServer.listen(port);  
