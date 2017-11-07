//exporting route config object

//method - the http method used access this endpoint
//path - request url used to access this endpoint
//method & path are used in conjunction

//config - settings for how the request is handled after its recieved
//auth.mode - if set to optional, the route will be
//accessible without any authentication header

//handler - the function that runs when a request is recieved at the endpoint
//handler: function(request, reply) {}
//request - the request object containing all details including data, parameters, ect.
//reply - a function that allows us to send an HTTP response with data
//or a message to the requester
module.exports = {
  method: "POST",
  path: "/api/users",
  config: {
    handler: function(request, reply) {
      //creating a new instance of a user from the User db model
      //will validate any data passwed in by compairing to the modelSchema
      let user = new this.models.User(request.payload);

      user
        .save() //saves the new user record to the database
        .then(user => reply(user)) //sends the saved user record in the http response
        .catch(err => reply(err)); //sends the error if one occurred in the http response
    }
  }
};
