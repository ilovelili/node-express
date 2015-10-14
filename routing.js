var http = require("http");

http.createServer(function(req, res) {
    // normalize url by removing querystring, optional trailing slash, and making it lowercase
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch (path) {
        case '':
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Home Page', 'utf-8');
            break;

        case '/about':
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('About Page', 'utf-8');
            break;

        default:
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.end('404', 'utf-8');
            break;
    }
}).listen(process.env.PORT, process.env.IP);