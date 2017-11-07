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
  method: "GET",
  path: "/api/users/{userId}",
  config: {
    handler: function(request, reply) {
      //grabs the param "userId" from the request url
      let userId = request.params.userId;

      this.models.User
        .get(userId) //fetches the User by the id found in the url
        .then(result => reply(result)) //sends the user found with the id in the http response
        .catch(err => reply(err)); // sends the error if one occurred in the http response
    }
  }
};
