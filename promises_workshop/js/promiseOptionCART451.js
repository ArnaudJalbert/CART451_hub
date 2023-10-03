// a promise - promises something in the future
// inside the promise is what executes ...
//resolve() - tells js that we are done and have a value
//reject() - used to throw  an  error
//promises are great because you do not need to nest the code - easier to control
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
//window.onload = function () {
const buttonCallB = document.querySelector("#callbackB");
const responseB = document.querySelector("#responseB");

buttonCallB.addEventListener("click", function () {
  console.log("clicked B");
  let returnedFruit = checkAuth_A(
    document.querySelector("#user-string-B").value,
  ).then((result) => {
    console.log(result);
  }).catch(error);
  console.log(returnedFruit);
});

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
