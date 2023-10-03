let http = require("http");
const PORT = 8080;
let server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("Hello World from CART451");
});

server.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
