'use strict';
/*jshint esversion: 6 */
/* jshint node: true */

var todos= require("../models/toDoModel");

module.exports = function(app) {
    app.get('/api/setuptodos', function(request, response) {
        //seed database
        var starterTodo = [
            {
                userName : "Kumar",
                toDo: "Complete Node Tutorial first",
                isDone: false,
                hasAttachment: false
            } ,
            {
                userName : "Abhishek",
                toDo: "Complete Sample Projects next",
                isDone: true,
                hasAttachment: false
            }
        ];
        todos.create(starterTodo, function(error, results) {
            if(error) throw error;
            response.send(results);
        });
    });
};