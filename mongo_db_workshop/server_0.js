const express = require("express");
const portNumber = 4200;
const app = express(); //make an instance of express
const server = require("http").createServer(app);
require("dotenv").config();

// create a server (using the Express framework object)
app.use(express.static(__dirname + "/public"));

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.use("/client", clientRoute);
const mongo_connection_url = process.env.MONGO_DB_URI;

const { MongoClient } = require("mongodb");

const client = new MongoClient(mongo_connection_url, {});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("success");

    // let result = await client
    //   .db("admin")
    //   .command({ listDatabases: 1, nameOnly: true });
    // console.log(result.databases);

    let db = await client.db("sample_airbnb");
    let collections = await db.listCollections().toArray();

    let listReviews = await db.collection("listingsAndReviews");

    // const options = {
    //   projection: { "host.host_name": 1, "host.host_neighbourhood": 1 },
    // };
    //
    // let result = await listReviews.findOne(
    //   { "host.host_name": "Karen" },
    //   options,
    // );
    //
    // console.log(result);
    //
    // let isInGroup = await listReviews.findOne(
    //   {
    //     "host.host_name": { $in: ["Josh", "Michelle", "Louise", "Karen"] },
    //   },
    //   options,
    // );
    //
    // console.log(isInGroup)

    // let results = await listReviews
    //   .find(
    //     { number_of_reviews: { $gt: 195 } },
    //     { projection: { "host.host_name": 1, number_of_reviews: 1 } },
    //   )
    //   .toArray();
    //
    // console.log(results);
    //
    // for (let entry of results) {
    //   console.log(entry);
    // }

    // let or_op = await listReviews
    //   .find({
    //     $or: [{ number_of_reviews: { $lt: 20 } }, { "host.host_name": "Josh" }],
    //   })
    //   .sort({ "host.host_name": -1 })
    //   .limit(10)
    //   .toArray();

    let updatedOne = await listReviews.findOneAndUpdate(
      { listing_url: "https://www.airbnb.com/rooms/10006546" },
      { $inc: { bedrooms: 2 } }
    );

    console.log(updatedOne);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

// run();

let data = [
  {
    country: "Spain",
    city: "Salamanca",
    name: "USAL",
    location: {
      type: "Point",
      coordinates: [-5.6722512, 17, 40.9607792],
    },
    students: [
      { year: 2014, number: 24774 },
      { year: 2015, number: 23166 },
      { year: 2016, number: 21913 },
      { year: 2017, number: 21715 },
    ],
  },
  {
    country: "Spain",
    city: "Salamanca",
    name: "UPSA",
    location: {
      type: "Point",
      coordinates: [-5.6691191, 17, 40.9631732],
    },
    students: [
      { year: 2014, number: 4788 },
      { year: 2015, number: 4821 },
      { year: 2016, number: 6550 },
      { year: 2017, number: 6125 },
    ],
  },
];

let courseData = [
  {
    university: "USAL",
    name: "Computer Science",
    level: "Excellent",
  },
  {
    university: "USAL",
    name: "Electronics",
    level: "Intermediate",
  },
  {
    university: "USAL",
    name: "Communication",
    level: "Excellent",
  },
];

async function create_database() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });

    let db = await client.db("arnoTest");
    // let unis = await db.createCollection("universities");
    // let courses = await db.createCollection("courses");
    let unis = await db.collection("universities");
    let courses = await db.collection("courses");

    // await unis.insertMany(data);
    // await courses.insertMany(courseData);

    let matches = await unis
      .aggregate([
        {
          $match: { country: "Spain", city: "Salamanca" },
        },
        { $project: { city: 1, name: 1 } },
        { $group: { _id: "$name", totaldocs: { $sum: 1 } } },
      ])
      .toArray();
    console.log(matches);
    console.log("success");
  } catch (error) {
  } finally {
  }
}

create_database();

// make server listen for incoming messages
server.listen(portNumber, function () {
  console.log("listening on port:: " + portNumber);
});

//default route
app.get("/", function (req, res) {
  res.send("<h1>Hello world</h1>");
});

function clientRoute(req, res, next) {
  res.sendFile(__dirname + "/public/client.html");
}
