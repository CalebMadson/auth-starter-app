//importing models and routes
const models = require("./models");
const routes = require("./routes");

//hapi plugins require a register export as a function
//function will recieve (server, options, next)
//server - the server instance the plugin was registered to
//options - a function the server has already been configured with
//next - a function that will move to execute the
//next plugin in the array of plugins registered
module.exports.register = (server, options, next) => {
  //server.bind takes all properties from the object passed in
  //and adds them to the server context (this) when inside a 'handler'
  //function of a route configuration
  //e.g. this.models === server.models
  server.bind({
    models: models
  });

  //set our authentication strategy to use
  //JSON web tokens
  //when a route has 'auth.mode' as "optional",
  //the server will check for an "Authorization" header
  //and use the key we define below to check its
  //validitity
  server.auth.strategy("jwt", "jwt", {
    key: "supersecretsecret",
    validateFunc: (decoded, request, callback) => {
      if (!decoded.id) return callback(null, false);
      else return callback(null, true);
    },
    verifyOptions: {
      algorithms: ["HS256"]
    }
  });
  //mutliple authentication schemes can be setup in one
  //server/api. here we are setting the default scheme
  //to be used unless otherwise specified per route
  server.auth.default({ strategy: "jwt" });

  // adds each route config as an API endpoint
  //endpoint - an address and method conbination that will trigger
  // a server function and provide a response back to the requester
  server.route(routes);

  //next - a function that will move to execute the
  //next plugin in the array of plugins registered
  next();
};

//hapi plugins are required to provide an export of register.attributes
//that contain a name and version to differentiate between other plugins registered

//this is to avoid registering duplicate plugins
module.exports.register.attributes = {
  name: "api",
  version: "0.0.1"
};
