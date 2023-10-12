const fs = require("fs");
const { MongoClient } = require("mongodb");
require("dotenv").config();

// connecting to the mongo client
const mongo_connection_url = process.env.MONGO_DB_URI;
const mongo_client = new MongoClient(mongo_connection_url, {});

/*
WHY THIS DATASET???
I chose the F1 Drivers dataset because I love F1 quite honestly...
I always look up F1 statistics, and I'm always curious about which driver
performed better in which part of the sport.
It is a nice experiment to make my own queries and quickly find out questions
I have about the sport.
 */

exports.insert_drivers_db = async function () {
  // reading the json file and converting it to objects
  const f1_drivers_json = fs.readFileSync("./data/f1_drivers.json");
  const f1_drivers_string = f1_drivers_json.toString();
  const f1_drivers = JSON.parse(f1_drivers_string);
  try {
    await mongo_client.connect();
    let f1_database = await mongo_client.db("f1");
    let drivers_collection = await f1_database.createCollection("drivers");
    for (const f1_driver of f1_drivers) {
      await drivers_collection.insertOne(f1_driver);
    }
  } catch (error) {
    console.log(error);
  } finally {
    await mongo_client.close();
  }
};

exports.get_all_drivers = async function (filter, sort) {
  let drivers = null;
  try {
    await mongo_client.connect();
    let f1_database = await mongo_client.db("f1");
    let drivers_collection = await f1_database.collection("drivers");
    drivers = await drivers_collection.find(filter).sort(sort).toArray();
  } catch (error) {
    console.log(error);
  } finally {
    await mongo_client.close();
  }
  return drivers;
};

exports.get_championship_winning_drivers = async function () {
  return exports.get_all_drivers({ Champion: "True" }, { Championships: -1 });
};

exports.get_pole_sitting_drivers = async function () {
  return exports.get_all_drivers(
    { Pole_Positions: { $gt: 0 } },
    { Pole_Positions: -1 },
  );
};

exports.get_race_winning_drivers = async function () {
  return exports.get_all_drivers({ Race_Wins: { $gt: 0 } }, { Race_Wins: -1 });
};

exports.get_race_winning_no_poles_drivers = async function () {
  return exports.get_all_drivers(
    { Race_Wins: { $gt: 0 }, Pole_Positions: 0 },
    { Race_Wins: -1 },
  );
};

exports.get_pole_sitters_no_wins_drivers = async function () {
  return exports.get_all_drivers(
    { Race_Wins: 0, Pole_Positions: { $gt: 0 } },
    { Pole_Positions: -1 },
  );
};

exports.get_drivers_active_at_least_n_years = async function (n) {
  return exports.get_all_drivers({ Years_Active: { $gte: n } }, { Years_Active: -1 });
};

async function main() {}
