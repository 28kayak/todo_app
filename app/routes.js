/**
 * Created by kaya on 7/6/2017.
 */
//load todo model
var Todo = require('./models/todo_model');
//routes ======================================================================
//export all routers to our app with module.exports
module.exports = function (app) {

//api =========================================================================
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
            Todo.find(function (err, todos) {
                if(err)
                {
                    res.send(err);
                }
                app.disable('etag') // use strong etags
                res.json(todos);


            })


        });//end of the remove
    });//end of the delete
// application ======================================================================
    app.get('*', function (req,res) {
        console.log(__dirname + '/public/index.html');
        res.sendFile(__dirname + '/public/index.html'); //path name has to be absolute.

    });

};//end of module.exports


