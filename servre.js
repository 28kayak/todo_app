/**
 * Created by kaya on 6/13/2017.
 */
// set up ========================
console.log("------set up--------");
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

var database = require('./dbconfig/database');// require database config file: database.js
//var Todo = require('./app/models/todo_model');//require db-model from todo_model.js

// configuration ================================================================
console.log("-----------DB configuration-------------------");
//connecting to DB
mongoose.connect(database.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log(db);
    console.log("we are connected");
});

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

//routers =====================================================================
//load routes.js
require('./app/routes')(app);


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");



