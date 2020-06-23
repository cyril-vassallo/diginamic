/*
* Exemple de callback sur événement
* Ce code se charge une fois la page entièrement chargée
*
* Sans le fonction à execution immédiate sur le callback
* i vaudrait liTags.length à chaque click puisque la boucle for
* s'effectue une fois la page chargée uniquement.
*/

const doWhenLoaded = function () {
    const liTags = document.getElementsByTagName('li');
    console.log(liTags)
    for(let i = 0; i < liTags.length; i++){
        liTags[i].addEventListener("click", (function (i) {
          return function() {
              console.log(i);
          liTags[i].innerHTML = liTags[i].innerHTML + 'Has been clicked';
          }
        })(i));
    }
}



window.onload = doWhenLoaded;



