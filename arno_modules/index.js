const testModuleVar = require("./moduleTest");

console.log(testModuleVar.name());
testModuleVar.setPetName("Snoopy");
console.log(testModuleVar.getPetName());
