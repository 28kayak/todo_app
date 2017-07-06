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
mongoose.connect("mongodb://todo:admin@ds141082.mlab.com:41082/todo_list");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log(db);
    console.log("we are connected");
});
//mongoose.connect(database.url);
//mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// db model definition ========================================================
//define schema
var  Todo_schema = mongoose.Schema( {
    text: String,
    done: Boolean
});
//compile todo_schema to a model
var Todo = mongoose.model('Todo', Todo_schema);



//routes ======================================================================

//api =====
//get all todo
app.get('/api/todos', function (req,res) {
    console.log("In side of  /api/todos");
    // use mongoose to get all todos in the database
     console.log(Todo);
    Todo.find({},function (err, todo) {
        //if these is an error retriving, send the error.
        //nothing after res.send(err) will execute
        console.log(err);
        if(err)
        {
            console.error(err);
            res.send(err);
        }
        //return all todos in JSON format
        console.log(todo);
        app.disable('etag') // use strong etags
        res.json(todo);
    });
});
//create todos and send back all todos after creation
app.post('/api/todos', function (req,res) {
    //create a todo, information comes from AJAX request from Angular
    Todo.create({
        text: req.body.text,
        done: false
    }, function (err, todo) {
        if(err)
        {
            res.send(err)
        }
        //find all todos, including a new todo
        Todo.find(function (err, todos) {
            if(err){
                res.send(err);
            }
            app.disable('etag') // use strong etags
            res.json(todos);
        });//end of todo.find

    });//end of todo.create

});//end of post
app.delete('/api/todos/:todo_id', function (req,res) {
    Todo.remove({
        _id: req.params.todo_id
    }, function (err, todo) {
        if(err)
        {
            res.send(err);
        }
        //get all the todos after deleting
        //and then return them 
        todo.find(function (err, todos) {
            
        })
        if(err)
        {
            res.send(err);
        }
        app.disable('etag') // use strong etags
        res.json(todos);
        
        
    });//end of the remove 
});//end of the delete 



// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");



