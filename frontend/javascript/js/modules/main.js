import Xhr from "./XMLHttpRequest.js";
console.log('dans main.js');
let data = [];

const xhr = new Xhr(
  "http://127.0.0.1:5500/javascript/js/json/user.json",
  successGetData,
  failedGetData
);



function successGetData(data) {
  data = data;
}
function failedGetData(msg) {
  console.error(msg);
}

