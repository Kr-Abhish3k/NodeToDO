'use strict';
/*jshint esversion: 6 */
/* jshint node: true */

var todos = require("../models/toDoModel");
var bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ 
        extended : true 
    }));  

    app.get("/home", (request, response) => {
        todos.find({}, (error,data) => {
           if (error) throw error;
           response.render("memberList", {people : data});
        });
   });

    app.get("/addMember",(request,response)=> {
        response.render("index",{member:""});
    });

    app.get("/api/todosDelete/:id", function(request, response) {
        todos.findByIdAndRemove({_id:request.params.id}, function(error, data) {
          if(error) {
               console.log(error.name);
       }
          response.redirect("/home");
        });
   });

   app.post("/api/search", (request,response)=>{
        todos.findById(  request.body.ID ,(error, data) =>{
            if(error) {
                request.body["searchError"] = "Invalid Id Entered.";
                response.render("index",{member:request.body});
            }else {
                
                request.body["search_User"] = data.userName;
                request.body["search_ToDo"] = data.toDo;
                request.body["search_IsDone"] = data.isDone;
                request.body["search_HasAttachment"] = data.hasAttachment;
                response.render("index",{member:request.body});
            }
        });
   });

   //gets called from edit link from table, gets ID and renders the data in form
   app.get("/api/updateTodo/:id" ,(request,response)=> {
        todos.findById(request.params.id ,(err,data) => {
            if(err) throw err;
            response.render("index",{member:data});
        });

   });

   app.post("/api/addTodo", function(request, response) {
       
        if( (request.body.Id).length >0 ) {
            updateRecord(request, response);
        }else {
            InsertRecord(request, response);
        }
    });
};

function InsertRecord(request,response) {
    console.log("Inserting....");
    var newTodo = todos({
        userName : request.body.userName,
        toDo: request.body.toDo,
        isDone: request.body.isDone,
        hasAttachment: request.body.hasAttachment
    });
    newTodo.save(function(error, data) {
        if(error) {
            if(error.name == "ValidationError") {    
                handleValidationError(error, request.body);
                response.render("index",{member:request.body});
            }
        } else {
            console.log('New document Saved');
            response.redirect('/home');
        }
    });
}

function updateRecord(request, response) {
    console.log("Updating...");
    todos.findOneAndUpdate({ _id:request.body.Id }, request.body , {runValidators:true ,new:true}, (error, data) => {
        if(error) {
            if(error.name == "ValidationError") {    
                handleValidationError(error, request.body);
                request.body['id'] = request.body.Id; // add ID to body if validation fails in update
                response.render("index",{member:request.body});
            }
        } else {
            console.log( request.body.Id + 'Document Updated');
             response.redirect('/home');
        }
    });
    
}

function handleValidationError(error, body) {
    for( var field in error.errors) {
        switch( error.errors[field].path ) {
            case 'userName':
                body["userNameError"]= error.errors[field].message;
                break;
            case 'toDo':
               body['toDOError']= error.errors[field].message;
                break;
            case 'isDone':
                body['isDoneError']= error.errors[field].message;

                break;
            case 'hasAttachment':
                body['attachmentError'] = error.errors[field].message;
                break;
            default: break;   
        }
    }
}