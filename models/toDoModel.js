'use strict';
/*jshint esversion: 6 */
/* jshint node: true */

var mongoose = require("mongoose");
var schema = mongoose.Schema;
//mongoose.Schema.Types.Boolean.convertToFalse.add('');

var todoSchema = new schema ({
    userName : {
        type:String,
        required: [true, "This field is required."]
    },
    toDo:{
        type:String,
        required: [true, "This field is required."]
    } ,
    isDone:{
        type:String,
        validate: {
            validator: function(val) {
              return  /^(true|false)$/ig.test(val);
            },
            message: props => `${props.value} is not a valid Boolean Value!`
          },
        required: [true, "This field requires a Boolean Value. "]
        
    } ,
    hasAttachment: {
        type:String,
        validate: {
            validator: function(val) {
              return  /^(true|false)$/ig.test(val);
            },
            message: props => `${props.value} is not a valid Boolean Value!`
          },
        required: [true, "This field requires a Boolean Value."]
    }
});

var toDos = mongoose.model('todos' ,  todoSchema);
module.exports = toDos;