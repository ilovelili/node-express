var http = require("http");

http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.write('Hello World', 'utf-8');
    res.end();
}).listen(process.env.PORT, process.env.IP);