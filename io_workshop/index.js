const fs = require("fs");
const FileHandler = require("./FileHandler");

let path = "./my_files/a.txt";
let file = new FileHandler(path);
let data = "\nallo mon chum";
let dataTwo = "\nallo mon chummey";

file.appendTextSync(data)
file.appendTextSync(dataTwo)

console.log(file.readTextSync().toString())
