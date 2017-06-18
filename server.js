var app = require('./express');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session      = require('express-session');


app.use(cookieParser());
app.use(session({ secret: "put some text here"}));

app.use(passport.initialize());
app.use(passport.session());



var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

// require ("./test/app.js")(app);

var port = process.env.PORT || 3000;

app.listen(port);

require("./assignment/app.js");
require("./project/app.js");