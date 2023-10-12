const f1_drivers_queries = require("./f1_drivers_queries");
const express = require("express");
const PORT = 4200;

let app = express();

app.use(express.static(__dirname + "/public"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} at address http://localhost:${PORT}/`);
});

app.get("/", (req, res) => {
  res.sendFile("./public/index.html");
});

// API
app.get("/f1_drivers_world_champion", async (req, res) => {
    let data = await f1_drivers_queries.get_championship_winning_drivers()
    res.send(data)
})

app.get("/f1_drivers_world_champion", async (req, res) => {
    let data = await f1_drivers_queries.get_championship_winning_drivers()
    res.send(data)
})

app.get("/f1_drivers_pole_sitters", async (req, res) => {
    let data = await f1_drivers_queries.get_pole_sitting_drivers()
    res.send(data)
})

app.get("/f1_drivers_race_winners", async (req, res) => {
    let data = await f1_drivers_queries.get_race_winning_drivers()
    res.send(data)
})


app.get("/f1_drivers_race_winners_no_poles", async (req, res) => {
    let data = await f1_drivers_queries.get_race_winning_no_poles_drivers()
    res.send(data)
})

app.get("/f1_drivers_pole_sitters_no_win", async (req, res) => {
    let data = await f1_drivers_queries.get_pole_sitters_no_wins_drivers()
    res.send(data)
})

app.get("/f1_drivers_years_active/years=:years_value", async (req, res) => {
    let years = parseInt(req.params["years_value"])
    let data = await f1_drivers_queries.get_drivers_active_at_least_n_years(years)
    res.send(data)
})




