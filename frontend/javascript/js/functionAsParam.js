/**
 * Exemple de passage d'une fonction en argument d'une autre fonction
 */
const doLoad = function () {

  const show = function (result) {
    console.log("result: " + result);
  };

  function sum(a, b, display) {
    let result = a + b;
    display(result);
  }

  sum(1, 2, show);
};

window.onload = doLoad;
