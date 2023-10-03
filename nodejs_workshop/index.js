let express = require("express");
const PORT = 4200;

let app = express();

app.use(express.static(__dirname  + "/public"))
app.use("/banana", banana_route)

function banana_route(req, res) {
  res.sendfile( __dirname + "/public/banana.html")
}

app.listen(PORT, function () {
  console.log("Server Running");
});

app.get("/", request_handler);

function request_handler(req, res) {
  console.log("hello ");
  console.log(req.url);
  res.send("sent from server");
}

// app.post("/a_post_end_point", post_request_handler);
//
// function post_request_handler(req, res) {
//   res.send("post was made");
// }

app.get("/bananas", function (req, res) {
  res.send("bananas were requested");
});

app.get("/bananas/fruits", function (req, res) {
  res.send("bananas and fruits were requested");
});

app.get("/fruit/veg/:veg_value/fruit/:fruit_value", function (req, res) {
  res.send(req.params);
  console.log(req.params);
});

app.get(
  "/fruits/watermelon",
  (req, res, next) => {
    res.send("watermelon");
    next();
  },
  (req, res) => {
    console.log("next here");
  },
);

app.use("/cheese", cheese_handler, [next_cheese_handler]);

function cheese_handler(req, res, next) {
  console.log("chheeese log");
  next();
}

function next_cheese_handler(req, res) {
  res.send("chheeessee");
}

app.use(express.json());
app.post("/a_post_end_point", post_request_handler);

function post_request_handler(req, res) {
  res.send("post was made");
  console.log(req.body);
}
