/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 //asynch / await -> available in es8
 //return promises just like before
 //USEs promises behind the scenes
 //looks LIKE synchronous code ... no need for .then() - 
 //you though can ONLY await INSIDE asynch functions...

*/
//window.onload = function () {
const buttonCallJ = document.querySelector("#callbackJ");
const responseJ = document.querySelector("#responseJ");

buttonCallJ.addEventListener("click", async function () {
  console.log("clicked");
  let returnedFruit = await checkAuth_A(document.querySelector("#user-string-J").value)
  console.log(returnedFruit)
}); //button

function checkAuth_A(userString) {
  return new Promise((resolve, reject) => {
    console.log(userString);
    setTimeout(() => {
      let userFruit = "";
      if (userString === "Sabine") {
        userFruit = "pineapple";
        resolve("pineapple");
      } else {
        reject("noFruit");
      }
      console.log("time-out one-a complete " + userFruit);
    }, 5000); // let 5 secs go past then send back
  });
}
