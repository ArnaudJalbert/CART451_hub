//import the Express library
let express = require("express");
const portNumber = 4200;
let app = express(); //make an instance of express
let server = require("http").createServer(app); // create a server (using the Express framework object)

//default route
app.get("/", function (req, res) {
  res.send("<h1>Hello world</h1>");
});

// make server listen for incoming messages
server.listen(portNumber, function () {
  console.log("listening on port:: " + portNumber);
});
