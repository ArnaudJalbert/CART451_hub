const f1_drivers_queries = require("./f1_drivers_queries");
const express = require("express");
const PORT = 4200

let app = express();

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} at address http://localhost:${PORT}/`)
})

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>")
})