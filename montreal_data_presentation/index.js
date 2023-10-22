const fs = require("fs");
const csv = require("fast-csv");
const express = require("express");

// data from here: https://donnees.montreal.ca/dataset/feux-pietons
const PEDESTRIANS_LIGHTS_CSV_PATH = "./data/feux-pietons.csv";
// data from here: https://donnees.montreal.ca/dataset/feux-malvoyants
const PEDESTRIANS_LIGHTS_WITH_SOUND_SIGNAL_CSV_PATH =
  "./data/traverses-pietonnes-signal-sonore.csv";

const PORT = 4200;
let app = express();
app.use(express.static(__dirname + "/public"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} at address http://localhost:${PORT}/`);
});

app.get("/", (req, res) => {
  res.sendFile("./public/index.html");
});

app.get("/pedestrian_lights", async (req, res) => {
  let pedestrians_lights = await read_data_from_csv(
    PEDESTRIANS_LIGHTS_CSV_PATH,
  );
  res.send(pedestrians_lights);
});

app.get("/pedestrian_lights_with_sound_signal", async (req, res) => {
  let pedestrians_lights_with_sound_signal = await read_data_from_csv(
    PEDESTRIANS_LIGHTS_WITH_SOUND_SIGNAL_CSV_PATH,
  );
  res.send(pedestrians_lights_with_sound_signal);
});

async function read_data_from_csv(csv_path) {
  return new Promise((resolve, reject) => {
    let data_container = [];
    fs.createReadStream(csv_path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => console.error(error))
      .on("data", (row) => data_container.push(row))
      .on("end", () => resolve(data_container));
  });
}
