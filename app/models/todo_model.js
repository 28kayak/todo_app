/**
 * Created by kaya on 6/28/2017.
 */
//import mongoose
var mongoose = require("mongoose");

var Todo = mongoose.model('Todo', {
    text: String,
    done: Boolean
});

module.exports = Todo;