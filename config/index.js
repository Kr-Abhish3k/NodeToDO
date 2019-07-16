var configValues = require("./config.json");
module.exports = {
    getDBconnectionString : function(){
        return  "mongodb+srv://"+configValues.userName+":"+configValues.password+"@cluster0-cxy2a.mongodb.net/test?retryWrites=true&w=majority";
    }
};