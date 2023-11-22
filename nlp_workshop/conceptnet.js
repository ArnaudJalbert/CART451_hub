const jsonld = require("jsonld");
const fs = require("fs");
const JsonLdParser = require("jsonld-streaming-parser").JsonLdParser;

async function runEx() {
  let result = await fetch("http://api.conceptnet.io/c/en/happy");
  let jsonRes = await result.json();

  console.log(jsonRes);
}

runEx();
