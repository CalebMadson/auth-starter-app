// Importing hapi to set up the server
// Importing the file api from the same directory to register
const hapi = require("hapi");
const api = require("./api");

// Initializing a server instance called server - building a server
const server = new hapi.Server();

// Modifying server settings
server.connection({
  //hostname
  host: "localhost",
  //port to access
  port: 4040,
  //allows all forms of requests
  routes: {
    cors: true
  },
  //removes last / on a url link
  router: {
    stripTrailingSlash: true
  }
});
// takes plugins in as an array
// and executes each plugin
//a plugin is a snippet of code that modifies the server settings
// more often then not is a pre built package we install
server
  .register([
    {
      register: api
    }
  ])
  .then(() => {
    //starting our server that was build earlier
    //endpoints in our api will now be reachable
    server
      .start()
      .then(() => console.log(`Server started at: ${server.info.uri}`))
      .catch(err => console.log(err));
  });
