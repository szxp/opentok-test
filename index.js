
"use strict";

var fs = require('fs');  
var path = require('path');  
var https = require('https');
var mime = require('mime');


var staticBasePath = './www';

var staticServe = function(req, res) {  
    
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);    
    
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

        fs.readFile(filename, "binary", function (err, file) {
            if (err) {
                console.log('Error: %s', err);
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                res.write("Server error\n");
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
