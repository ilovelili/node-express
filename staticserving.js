var http = require("http"),
    fs = require("fs"),
    serveStaticFile = function(res, file, contentType, responseCode) {
        if (!responseCode) responseCode = 200;
        fs.readFile(__dirname + file, function(err, data) {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                res.end('server error', 'utf-8');
            }
            else {
                res.writeHead(responseCode, {
                    'Content-Type': contentType
                });
                res.end(data, 'utf-8');
            }
        });
    };

http.createServer(function(req, res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch (path) {
        case '':
            serveStaticFile(res, '/static/index.html', 'text/html', 200);
            break;

        case '/about':
            serveStaticFile(res, '/static/about.html', 'text/html', 200);
            break;

        default:
            serveStaticFile(res, '/static/404.html', 'text/html', 404);
            break;
    }
}).listen(process.env.PORT, process.env.IP);