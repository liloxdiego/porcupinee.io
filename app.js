
/**
 * Module dependencies.
 */

var express = require('express');
	routes = require('./routes'),
	user = require('./routes/user'),
	http = require('http'),
	path = require('path'),
	i18n = require("i18n"),
	app = express();

i18n.configure({
	locales : ["en", "es"],
	directory : __dirname + '/locale',
	cookie : "language"
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.cookieParser());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(i18n.init);
// Should be always before app.router
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get("/lang/en", function(req, res) {
	res.cookie('language', 'en', {
		maxAge : 900000,
		httpOnly : true
	});
	// routes.index(req, res);
	res.redirect("/");
});
app.get("/lang/es", function(req, res) {
	res.cookie('language', 'es', {
		maxAge : 900000,
		httpOnly : true
	});
	// routes.index(req, res);
	res.redirect("/");
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

