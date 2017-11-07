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
  path: "/api/users/login",
  config: {
    // auth: {
    //   mode: "optional"
    // },
    handler: function(request, reply) {
      reply("not implemented");
    }
  }
};
