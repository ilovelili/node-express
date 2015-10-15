var express = require("express"),
    app = express(),
    handlebars = require("express3-handlebars").create({
        defaultLayout: 'main'
    }),
    fortune = require("./lib/fortune").getFortune();

app.set('port', process.env.PORT);
app.set('ip', process.env.IP);

// template engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars'); // must be fixed 'view engine'
// app.enable('view cache');

// Express.js views middleware as a chain, and it just keeps going down the chain until a response is ended or it decides there is nothing left to do
// SO, THE ORDER IS VERY IMPORTANT

// test middleware
app.use(function(req, res, next) {
    // there is app.locals / res.locals
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === 'true';
    next();
});

// static middleware
app.use(express.static(__dirname + '/public'));

// app.get handles GET routing
app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {
    res.render('about', {
        fortune: fortune,
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/tours/hood-river', function(req, res) {
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res) {
    res.render('tours/request-group-rate');
});


// app.use is the method by which Express adds middleware.
// 404
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
    // next();  // end the pipeline
});

// Define error-handling middleware like other middleware, except with four arguments instead of three, specifically with the signature (err, req, res, next)
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
    // next();  // end the pipeline
});

app.listen(app.get('port'), app.get('ip'), function() {
    console.log('Express started on ' + app.get('ip') + ':' + app.get('port'));
});