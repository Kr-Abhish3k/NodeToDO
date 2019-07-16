'use strict';
/*jshint esversion: 6 */
/* jshint node: true */

const express = require("express");
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const setupController = require("./controller/setupController");
const apiController = require("./controller/apiController");
const config = require("./config");

const port = process.env.PORT || 3000;

app.use("/assets", express.static(__dirname+"/public"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname+"/public/views"));

mongoose.connect(config.getDBconnectionString(), {"useNewUrlParser": "true","useFindAndModify":"false","useCreateIndex":"true"},(err)=>{
    if(!err) {
        console.log("DataBase Connection successfull");
    }else { 
        console.log("Could Not Connect To database . Error log : - "+err);
    }
});

setupController(app);
apiController(app);

app.listen(port, ()=>{
    console.log("server started on port "+port);
    console.log("Press Ctrl+C to STOP.");
});

