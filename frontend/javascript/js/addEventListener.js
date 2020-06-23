"use strict";

// addEventListener
(function(){

  // Récupération d'un élément du DOM
const h1 = window.document.getElementById("h1");
/**
 * Gestion de l'événement click sur h1
 * On ajoute à l'objet h1 une propriété qui est
 * une méthode appellée lors d'un click sur
 * l'objet en question.
 * Le "this" devient alors l'objet en question
 */

    function Test(msg){
        this.msg =msg;
        h1.onclick = function (event) { console.log(this)}  ;
    }
    
    const test = new Test();


})();