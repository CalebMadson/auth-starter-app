//importing thinky to set up a database connection
const thinky = require("thinky");

//build and configures the databse connection
//and finally starts the connection
//this is what causes your server to blow up if
//rethinkdb is not running
const db = thinky({
  db: "authWalkthrough"
});

//bringing in the user model function, and calling the function
//passing in the db instance
//return value to the variable User is the configured db model
let User = require("./user")(db);

//exporting the models as properties of the module
module.exports = {
  User: User
};
