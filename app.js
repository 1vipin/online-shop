var express = require('express');
var app = express()
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var hbs = require('hbs');
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/online-shopp');
var db = mongoose.connection;

// View Engine
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

var index = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.use(expressSession({
    secret:"secret",
    saveUninitialized: false,
    result: true
})
);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
})
app.use('/',index);

// Set Port
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
	console.log('Server started on port ' + app.get('port'));
});